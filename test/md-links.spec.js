const { mdLinks, validarLinks } = require('../index.js');

describe('mdLinks', () => {
  it('Ler os links', () => {
    return mdLinks('./test/files/oneFile.md').then(links => {
      expect(links).toBeInstanceOf(Array);
      expect(links.length).toBeGreaterThanOrEqual(1);

      const primeiroLink = links[0];
      expect(primeiroLink).toHaveProperty('href');
      expect(primeiroLink).toHaveProperty('text');
      expect(primeiroLink).toHaveProperty('file');
    });
  });

  it('Ler sem links', () => {
    return mdLinks('./test/files/twoFile.md').then(links => {
      expect(links).toBeInstanceOf(Array);
      expect(links).toHaveLength(0);
    });
  });
});

describe('validarLinks', () => {
  it('validações dos links', () => {
    const links = [
      { href: 'https://www.google.com/', text: 'Google', file: './test/files/oneFile.md' },
      { href: 'https://github.com/emilainesantos', text: 'GitHub', file: './test/files/oneFile.md' },
      { href: 'https://github.com/emi21654341d54fsg', text: 'Link Quebrado', file: './test/files/oneFile.md' }
    ];

    return validarLinks(links).then(resultados => {
      expect(resultados).toBeInstanceOf(Array);
      expect(resultados).toHaveLength(3);

      const primeiroResultado = resultados[0];
      expect(primeiroResultado).toHaveProperty('href', 'https://www.google.com/');
      expect(primeiroResultado).toHaveProperty('text', 'Google');
      expect(primeiroResultado).toHaveProperty('file', './test/files/oneFile.md');
      expect(primeiroResultado).toHaveProperty('ok', expect.stringMatching(/ok|fail/));
      expect(primeiroResultado).toHaveProperty('broken', expect.any(Boolean));
    });
  });
});
