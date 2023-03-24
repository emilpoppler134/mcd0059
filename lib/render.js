import fs from 'fs';

export default function render(fileName, res) {
  const path = "./views/" + fileName;

  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
  } else {
    res.status(500);
    res.end();
  }
}
