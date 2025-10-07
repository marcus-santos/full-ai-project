const express = require('express');
const { connectDB } = require('../database/config');
const authRouter = require('./auth');
const { authenticateToken } = authRouter;

const router = express.Router();

// Listar todos os produtos
router.get('/', (req, res) => {
  const db = connectDB();

  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar produtos' });
    }

    res.json(products);
  });
});

// Buscar produto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const db = connectDB();

  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  });
});

// Criar novo produto (protegido)
router.post('/', authenticateToken, (req, res) => {
  const { name, description, price, image_url, category, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  if (price <= 0) {
    return res.status(400).json({ error: 'Preço deve ser maior que zero' });
  }

  const db = connectDB();

  db.run(
    'INSERT INTO products (name, description, price, image_url, category, stock) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description || '', price, image_url || '', category || 'Geral', stock || 0],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar produto' });
      }

      res.status(201).json({
        message: 'Produto criado com sucesso',
        product: {
          id: this.lastID,
          name,
          description: description || '',
          price,
          image_url: image_url || '',
          category: category || 'Geral',
          stock: stock || 0
        }
      });
    }
  );
});

// Atualizar produto (protegido)
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, category, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  if (price <= 0) {
    return res.status(400).json({ error: 'Preço deve ser maior que zero' });
  }

  const db = connectDB();

  db.run(
    'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, category = ?, stock = ? WHERE id = ?',
    [name, description || '', price, image_url || '', category || 'Geral', stock || 0, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar produto' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.json({
        message: 'Produto atualizado com sucesso',
        product: {
          id: parseInt(id),
          name,
          description: description || '',
          price,
          image_url: image_url || '',
          category: category || 'Geral',
          stock: stock || 0
        }
      });
    }
  );
});

// Deletar produto (protegido)
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const db = connectDB();

  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto deletado com sucesso' });
  });
});

module.exports = router;