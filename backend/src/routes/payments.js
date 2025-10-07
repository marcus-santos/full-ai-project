const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { connectDB } = require('../database/config');
const authRouter = require('./auth');
const { authenticateToken } = authRouter;

const router = express.Router();

// Criar pagamento PIX
router.post('/pix', authenticateToken, (req, res) => {
  const { productId, amount } = req.body;
  const userId = req.user.userId;

  if (!productId || !amount) {
    return res.status(400).json({ error: 'ID do produto e valor são obrigatórios' });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: 'Valor deve ser maior que zero' });
  }

  const db = connectDB();

  // Verificar se o produto existe
  db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar produto' });
    }

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Gerar dados do PIX fictício
    const transactionId = uuidv4();
    const pixKey = '00020126580014br.gov.bcb.pix0136' + uuidv4().replace(/-/g, '') + '5204000053039865802BR5925LOJA FICTICIA E-COMMERCE6009SAO PAULO62070503***6304';
    
    // Criar registro de pagamento
    db.run(
      'INSERT INTO payments (user_id, product_id, amount, payment_method, pix_key, transaction_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, productId, amount, 'pix', pixKey, transactionId, 'pending'],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Erro ao criar pagamento' });
        }

        res.status(201).json({
          message: 'Pagamento PIX criado com sucesso',
          payment: {
            id: this.lastID,
            transactionId,
            pixKey,
            amount,
            status: 'pending',
            product: {
              id: product.id,
              name: product.name,
              price: product.price
            },
            instructions: 'Copie e cole a chave PIX no seu aplicativo bancário para realizar o pagamento',
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutos
          }
        });
      }
    );
  });
});

// Simular confirmação de pagamento PIX
router.post('/pix/:transactionId/confirm', authenticateToken, (req, res) => {
  const { transactionId } = req.params;
  const userId = req.user.userId;

  const db = connectDB();

  // Buscar pagamento
  db.get(
    'SELECT p.*, pr.name as product_name FROM payments p JOIN products pr ON p.product_id = pr.id WHERE p.transaction_id = ? AND p.user_id = ?',
    [transactionId, userId],
    (err, payment) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar pagamento' });
      }

      if (!payment) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      if (payment.status === 'confirmed') {
        return res.status(400).json({ error: 'Pagamento já foi confirmado' });
      }

      // Simular confirmação (em um sistema real, isso viria do banco)
      db.run(
        'UPDATE payments SET status = ? WHERE transaction_id = ?',
        ['confirmed', transactionId],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Erro ao confirmar pagamento' });
          }

          res.json({
            message: 'Pagamento confirmado com sucesso!',
            payment: {
              id: payment.id,
              transactionId: payment.transaction_id,
              amount: payment.amount,
              status: 'confirmed',
              product: payment.product_name,
              confirmedAt: new Date().toISOString()
            }
          });
        }
      );
    }
  );
});

// Listar pagamentos do usuário
router.get('/my-payments', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const db = connectDB();

  db.all(
    `SELECT p.*, pr.name as product_name, pr.price as product_price 
     FROM payments p 
     JOIN products pr ON p.product_id = pr.id 
     WHERE p.user_id = ? 
     ORDER BY p.created_at DESC`,
    [userId],
    (err, payments) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar pagamentos' });
      }

      res.json(payments.map(payment => ({
        id: payment.id,
        transactionId: payment.transaction_id,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.payment_method,
        createdAt: payment.created_at,
        product: {
          id: payment.product_id,
          name: payment.product_name,
          price: payment.product_price
        }
      })));
    }
  );
});

// Verificar status do pagamento
router.get('/status/:transactionId', authenticateToken, (req, res) => {
  const { transactionId } = req.params;
  const userId = req.user.userId;

  const db = connectDB();

  db.get(
    'SELECT * FROM payments WHERE transaction_id = ? AND user_id = ?',
    [transactionId, userId],
    (err, payment) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao verificar status do pagamento' });
      }

      if (!payment) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      res.json({
        transactionId: payment.transaction_id,
        status: payment.status,
        amount: payment.amount,
        createdAt: payment.created_at
      });
    }
  );
});

module.exports = router;