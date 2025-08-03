# 🚀 Guia Completo: GitHub + Vercel Deploy

## 📋 Pré-requisitos
- Git instalado no sistema
- Conta no GitHub
- Conta no Vercel (pode usar login do GitHub)

---

## 🎯 Passo 1: Preparar o Repositório Local

### 1.1 Navegar para a pasta do projeto
```bash
cd /home/nailton/Documentos/Projetos/PGE-SEI
```

### 1.2 Inicializar Git (se ainda não foi feito)
```bash
git init
```

### 1.3 Configurar Git (se necessário)
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@gmail.com"
```

### 1.4 Verificar status dos arquivos
```bash
git status
```

---

## 🌐 Passo 2: Criar Repositório no GitHub

### 2.1 Acessar GitHub
- Ir para: https://github.com
- Fazer login na sua conta

### 2.2 Criar novo repositório
- Clicar no botão **"New"** (ou símbolo +)
- **Repository name**: `juspublic-mockup-pge`
- **Description**: `Sistema JusPublic - Mockup moderno para PGE (espelho do SEI)`
- ✅ **Public** (para deploy gratuito no Vercel)
- ❌ **NÃO** marcar "Add a README file"
- ❌ **NÃO** marcar "Add .gitignore" 
- ❌ **NÃO** marcar "Choose a license"
- Clicar **"Create repository"**

### 2.3 Copiar URL do repositório
Exemplo: `https://github.com/seuusuario/juspublic-mockup-pge.git`

---

## 📦 Passo 3: Conectar Local com GitHub

### 3.1 Adicionar origem remota
```bash
git remote add origin https://github.com/SEUUSUARIO/juspublic-mockup-pge.git
```
*Substituir SEUUSUARIO pelo seu usuário do GitHub*

### 3.2 Verificar origem
```bash
git remote -v
```

---

## 💾 Passo 4: Primeiro Commit e Push

### 4.1 Adicionar todos os arquivos
```bash
git add .
```

### 4.2 Verificar arquivos adicionados
```bash
git status
```

### 4.3 Fazer o commit inicial
```bash
git commit -m "🎉 Initial commit: JusPublic Mockup - Sistema moderno PGE

✨ Funcionalidades implementadas:
- Dashboard com estatísticas em tempo real
- Visualizador de processos integrado 
- Editor de documentos com IA
- Sistema de movimentação de processos
- Chat colaborativo da equipe
- Layout responsivo e moderno
- Integração simulada com SEI

🛠️ Stack: React 18 + TypeScript + Vite + Tailwind CSS
🚀 Deploy: Configurado para Vercel"
```

### 4.4 Fazer push para GitHub
```bash
git push -u origin main
```

*Se der erro de branch, usar:*
```bash
git branch -M main
git push -u origin main
```

---

## 🌟 Passo 5: Deploy no Vercel

### 5.1 Acessar Vercel
- Ir para: https://vercel.com
- Fazer login com GitHub

### 5.2 Importar projeto
- Clicar **"New Project"**
- Selecionar **"Import Git Repository"**
- Encontrar `juspublic-mockup-pge` na lista
- Clicar **"Import"**

### 5.3 Configurar deploy
- **Project Name**: `juspublic-mockup-pge`
- **Framework Preset**: Vite (deve detectar automaticamente)
- **Root Directory**: `./` (padrão)
- **Build Command**: `npm run build` (padrão)
- **Output Directory**: `dist` (padrão)
- Clicar **"Deploy"**

### 5.4 Aguardar deploy
- Vercel vai instalar dependências e fazer build
- Tempo estimado: 1-3 minutos
- ✅ Deploy concluído!

---

## 🔄 Passo 6: Atualizações Futuras

### 6.1 Para fazer alterações
```bash
# Fazer mudanças no código
# Depois:
git add .
git commit -m "✨ Descrição da alteração"
git push
```

### 6.2 Deploy automático
- Vercel detecta push no GitHub
- Faz deploy automático
- Novo link é gerado

---

## 📋 Comandos de Referência Rápida

```bash
# Status do projeto
git status

# Ver histórico
git log --oneline

# Ver diferenças
git diff

# Adicionar arquivos específicos
git add src/components/NovoComponente.tsx

# Commit com mensagem
git commit -m "🐛 Fix: Correção no componente X"

# Push das mudanças
git push

# Ver branches
git branch

# Criar nova branch
git checkout -b feature/nova-funcionalidade

# Voltar para main
git checkout main
```

---

## 🌐 Links Importantes

Após o deploy, você terá:

- **📁 Repositório GitHub**: `https://github.com/SEUUSUARIO/juspublic-mockup-pge`
- **🚀 App no Vercel**: `https://juspublic-mockup-pge.vercel.app`
- **⚙️ Dashboard Vercel**: `https://vercel.com/SEUUSUARIO/juspublic-mockup-pge`

---

## 🆘 Resolução de Problemas

### Erro de autenticação GitHub
```bash
# Se pedir credenciais, usar token pessoal
# GitHub → Settings → Developer settings → Personal access tokens
```

### Erro de build no Vercel
- Verificar se `npm run build` funciona localmente
- Verificar arquivo `vercel.json` está correto
- Verificar dependências no `package.json`

### Erro de permissão
```bash
# Se der erro de permissão:
sudo chown -R $USER:$USER .git
```

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código commitado e sincronizado
- [ ] Deploy no Vercel funcionando
- [ ] URL pública acessível
- [ ] README.md atualizado
- [ ] Documentação completa

---

## 🎯 Próximos Passos

1. **🔗 Compartilhar**: Enviar link do Vercel para cliente
2. **📱 Testar**: Verificar responsividade e funcionalidades
3. **📊 Monitorar**: Acompanhar analytics no Vercel
4. **🔄 Iterar**: Fazer ajustes baseados no feedback

**🎉 Parabéns! Seu mockup JusPublic está no ar!**