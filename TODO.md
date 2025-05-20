# Builds:
- Adicionar senha segura (hashed) para conexões do banco no docker compose
- criar um build do docker para produção
  - Usar uma imagem mais leve e segura para produção
- postgre precisa de um volume fixo para produção
  - Possivelmente mudar para um database gerenciado (Ex. AWS RDS)

# Tests
- Testes possuem baixa cobertura