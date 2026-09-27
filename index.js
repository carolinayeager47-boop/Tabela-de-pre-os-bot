const express = require('express');
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require('discord.js');

const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Bot Tabela de Preços online!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor online na porta ${port}`);
});

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('preco')
    .setDescription('Mostra a tabela de preços')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log('Comando /preco registrado!');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'preco') {
    await interaction.reply(
      '🛒 **Tabela de Preços**\n\n' +
      '📦 Produto 1 — **R$ 10,00**\n' +
      '📦 Produto 2 — **R$ 20,00**\n' +
      '📦 Produto 3 — **R$ 30,00**'
    );
  }
});

client.login(token);
