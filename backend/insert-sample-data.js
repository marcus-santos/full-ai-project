const { connectDB } = require('./src/database/config');

// Script para inserir produtos de exemplo
const insertSampleProducts = () => {
  const db = connectDB();

  const sampleProducts = [
    {
      name: 'Smartphone Samsung Galaxy S23',
      description: 'Smartphone Android com 256GB de armazenamento, tela AMOLED de 6.1 polegadas, câmera tripla de 50MP',
      price: 2499.99,
      category: 'Eletrônicos',
      stock: 15,
      image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
    },
    {
      name: 'Notebook Dell Inspiron 15',
      description: 'Notebook com Intel Core i5, 8GB RAM, SSD 256GB, tela 15.6 polegadas Full HD',
      price: 2299.00,
      category: 'Eletrônicos',
      stock: 8,
      image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
    },
    {
      name: 'Camiseta Básica Azul',
      description: 'Camiseta 100% algodão, cor azul marinho, tamanhos P ao GG',
      price: 39.90,
      category: 'Roupas',
      stock: 50,
      image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
    },
    {
      name: 'Livro: JavaScript - O Guia Definitivo',
      description: 'Livro completo sobre JavaScript moderno, 7ª edição',
      price: 89.90,
      category: 'Livros',
      stock: 25,
      image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'
    },
    {
      name: 'Tênis Nike Air Max',
      description: 'Tênis esportivo confortável para corrida e caminhada',
      price: 299.99,
      category: 'Esportes',
      stock: 12,
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
    },
    {
      name: 'Cafeteira Elétrica Philips',
      description: 'Cafeteira automática para 12 xícaras, com timer programável',
      price: 159.90,
      category: 'Casa',
      stock: 20,
      image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'
    }
  ];

  const insertProduct = (product) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO products (name, description, price, image_url, category, stock) VALUES (?, ?, ?, ?, ?, ?)',
        [product.name, product.description, product.price, product.image_url, product.category, product.stock],
        function(err) {
          if (err) {
            reject(err);
          } else {
            console.log(`Produto inserido: ${product.name} (ID: ${this.lastID})`);
            resolve(this.lastID);
          }
        }
      );
    });
  };

  // Inserir todos os produtos
  Promise.all(sampleProducts.map(insertProduct))
    .then(() => {
      console.log('Todos os produtos de exemplo foram inseridos com sucesso!');
      db.close();
    })
    .catch((error) => {
      console.error('Erro ao inserir produtos:', error);
      db.close();
    });
};

insertSampleProducts();