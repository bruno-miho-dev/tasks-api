import { parse } from "csv-parse";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Para garantir o caminho correto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, "tasks.csv");

// Verificar se o arquivo existe antes de tentar ler
if (!fs.existsSync(csvPath)) {
  console.error("❌ Arquivo tasks.csv não encontrado em:", csvPath);
  process.exit(1);
}

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2,
});

async function run() {
  const linesParse = stream.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;

    try {
      await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      console.log(`✅ ${title} importada com sucesso`);
    } catch (error) {
      console.error(`❌ Erro ao importar ${title}:`, error.message);
    }
  }

  console.log("🎉 Importação concluída!");
}

run();
