// Pulls in every file under src/assets/Companylogos at build time (Vite
// resolves each to a hashed, optimized URL). `eager: true` means they're
// all bundled upfront — fine for ~18 small logos used above the fold.
const logoModules = import.meta.glob('../assets/Companylogos/*', { eager: true });

// Map "aklogo" -> url, regardless of the actual file extension/case
// (AKlogo.png, Familylogo.PNG, etc. all normalize the same way).
const logoByKey = {};
for (const path in logoModules) {
  const filename = path.split('/').pop();
  const key = filename.replace(/\.[^.]+$/, '').toLowerCase();
  logoByKey[key] = logoModules[path].default;
}

// Display name + the filename (minus extension, lowercased) it maps to —
// matches the asset list from the original Flutter TrustSection.
const COMPANIES = [
  ['AL KARAM Hosiery', 'aklogo'],
  ['Al-Saeed Sweets & Bakers', 'alsaeedlogo'],
  ['AU', 'aulogo'],
  ['Asad', 'asadlogo'],
  ['Brainy Buddies', 'brainylogo'],
  ['Dairy Farm', 'dairylogo'],
  ['Family', 'familylogo'],
  ['Fast Colour', 'fastlogo'],
  ['FN', 'fnlogo'],
  ['Graphics Lab', 'graphicslogo'],
  ['Nova', 'novalogo'],
  ['Onex', 'onexlogo'],
  ['Sabir Tailor', 'sabirlogo'],
  ['Saloon', 'saloonlogo'],
  ['SKMS', 'skmslogo'],
  ['Tech Soft', 'techsoftlogo'],
  ['Waheed Foods', 'waheedfoodslogo'],
  ['Govt', 'govtlogo'],
].map(([name, key]) => ({ name, logo: logoByKey[key] }));

function LogoTile({ name, logo }) {
  return (
    <div className="flex h-[120px] w-[160px] flex-shrink-0 items-center justify-center rounded-xl border border-[#1A2233] bg-[#05070C]/40 p-3">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="h-[100px] w-[140px] object-contain"
        />
      ) : (
        <span className="text-xs font-bold uppercase tracking-wide text-[#5B677E]">
          {name}
        </span>
      )}
    </div>
  );
}


export function TrustSection() {
  const doubled = [...COMPANIES, ...COMPANIES];

  return (
    <section className="border-y border-[#1A2233] bg-[#0A0E17] py-[26px]">
      <div className="mx-auto max-w-[1240px] px-6 text-center">
        <h2 className="text-xl font-extrabold tracking-tight text-[#F3F6FB] sm:text-[28px]">
          Trusted by Industry Leaders
        </h2>
        <p className="mt-1.5 text-[13px] text-[#5B677E] sm:text-[15px]">
          Companies that rely on us to build their digital future
        </p>
      </div>

      <div className="relative mt-5 overflow-hidden">
        <div className="flex w-max gap-6 animate-marquee">
          {doubled.map((c, i) => (
            <LogoTile key={`${c.name}-${i}`} name={c.name} logo={c.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}