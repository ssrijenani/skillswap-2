const SYNONYMS = {
  'javascript': ['js', 'es6', 'vanilla js', 'ecmascript'],
  'typescript': ['ts'],
  'react': ['reactjs', 'react.js'],
  'node.js': ['node', 'nodejs'],
  'python': ['python3', 'py'],
  'ui/ux design': ['ux', 'ui', 'user experience', 'user interface', 'ux design', 'ui design'],
  'figma': ['figma design', 'figma prototyping'],
  'branding': ['brand design', 'brand identity', 'visual identity'],
  'data analysis': ['data analytics', 'analytics', 'data science'],
  'motion design': ['motion graphics', 'animation'],
  'after effects': ['ae', 'adobe after effects'],
  'illustrator': ['adobe illustrator', 'ai'],
  'content strategy': ['content marketing', 'copywriting'],
  'seo': ['search engine optimisation', 'search engine optimization'],
  'apis': ['rest api', 'rest', 'api design', 'backend'],
};

const REVERSE_MAP = {};
for (const [canonical, aliases] of Object.entries(SYNONYMS)) {
  for (const alias of aliases) {
    REVERSE_MAP[alias] = canonical;
  }
}

function normalise(skill) {
  return skill.toLowerCase().replace(/[^a-z0-9 .]/g, '').trim();
}

function canonicalise(skill) {
  const norm = normalise(skill);
  return REVERSE_MAP[norm] ?? norm;
}

function directedScore(offered, wanted) {
  if (!wanted.length) return 0;

  let total = 0;

  for (const want of wanted) {
    const wantNorm = normalise(want);
    const wantCanon = canonicalise(want);

    let best = 0;

    for (const offer of offered) {
      const offerNorm = normalise(offer);
      const offerCanon = canonicalise(offer);

      if (offerNorm === wantNorm) {
        best = Math.max(best, 1.0);
        continue;
      }

      if (offerCanon === wantCanon) {
        best = Math.max(best, 0.8);
        continue;
      }

      if (offerNorm.includes(wantNorm) || wantNorm.includes(offerNorm)) {
        best = Math.max(best, 0.4);
      }
    }

    total += best;
  }

  return total / wanted.length;
}

export function computeScore(userA, userB) {
  const aToB = directedScore(userA.skillsOffered, userB.skillsWanted);
  const bToA = directedScore(userB.skillsOffered, userA.skillsWanted);

  return Math.min(100, Math.floor(((aToB + bToA) / 2) * 100));
}

export function rankMatches(targetUser, candidates) {
  return candidates
    .filter((c) => c.id !== targetUser.id)
    .map((c) => ({
      user: c,
      score: computeScore(targetUser, c),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
}
