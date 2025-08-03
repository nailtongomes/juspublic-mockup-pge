# 🚀 Comandos Rápidos - JusPublic Deploy

## 📋 Sequência Completa de Deploy

### 1️⃣ Preparar Git
```bash
cd /home/nailton/Documentos/Projetos/PGE-SEI
git init
git config user.name "Seu Nome"
git config user.email "seu.email@gmail.com"
```

### 2️⃣ Conectar com GitHub
```bash
# Substitua SEUUSUARIO pelo seu usuário do GitHub
git remote add origin https://github.com/SEUUSUARIO/juspublic-mockup-pge.git
```

### 3️⃣ Primeiro Push
```bash
git add .
git commit -m "🎉 Initial commit: JusPublic Mockup - Sistema moderno PGE

✨ Funcionalidades:
- Dashboard integrado
- Editor de documentos com IA  
- Sistema de movimentação
- Chat da equipe
- Layout responsivo

🛠️ Stack: React 18 + TypeScript + Vite + Tailwind"

git branch -M main
git push -u origin main
```

### 4️⃣ Atualizações Futuras
```bash
# Depois de fazer alterações:
git add .
git commit -m "✨ Descrição da mudança"
git push
```

---

## 🌐 Deploy no Vercel

1. **Acessar**: https://vercel.com
2. **Login**: Com GitHub
3. **New Project** → Import `juspublic-mockup-pge`
4. **Deploy** → Aguardar conclusão
5. **✅ Pronto!** Link será gerado automaticamente

---

## 🔧 Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Verificar erros de lint
npm run lint
```

---

## 📱 Teste Rápido Local

```bash
npm run build && npm run preview
```
Acesse: http://localhost:4173

---

## 🆘 Se der Problema

### Erro de permissão:
```bash
sudo chown -R $USER:$USER .
```

### Reset git (caso necessário):
```bash
rm -rf .git
git init
# Repetir processo de conexão
```

### Verificar status:
```bash
git status
git remote -v
npm run build
```

---

## 🎯 URLs Finais

- **GitHub**: `https://github.com/SEUUSUARIO/juspublic-mockup-pge`
- **Vercel**: `https://juspublic-mockup-pge.vercel.app`

**✨ Deploy automático**: Qualquer push no GitHub atualiza o Vercel!