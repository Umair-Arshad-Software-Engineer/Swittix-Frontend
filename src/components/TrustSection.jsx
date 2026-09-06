// Pulls in every file under src/assets/Companylogos at build time
const logoModules = import.meta.glob('../assets/Companylogos/*', { eager: true });

const logoByKey = {};
for (const path in logoModules) {
  const filename = path.split('/').pop();
  const key = filename.replace(/\.[^.]+$/, '').toLowerCase();
  logoByKey[key] = logoModules[path].default;
}

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
    <div className="flex h-[80px] w-[120px] sm:h-[100px] sm:w-[140px] lg:h-[120px] lg:w-[160px] flex-shrink-0 items-center justify-center rounded-xl border border-[#1A2233] bg-[#05070C]/40 p-2 sm:p-3">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="h-[60px] w-[100px] sm:h-[80px] sm:w-[120px] lg:h-[100px] lg:w-[140px] object-contain"
        />
      ) : (
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-[#5B677E]">
          {name}
        </span>
      )}
    </div>
  );
}

export function TrustSection() {
  const doubled = [...COMPANIES, ...COMPANIES];

  return (
    <section className="border-y border-[#1A2233] bg-[#0A0E17] py-4 sm:py-[26px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 text-center">
        <h2 className="text-lg sm:text-xl lg:text-[28px] font-extrabold tracking-tight text-[#F3F6FB]">
          Trusted by Industry Leaders
        </h2>
        <p className="mt-1 text-xs sm:text-[13px] lg:text-[15px] text-[#5B677E]">
          Companies that rely on us to build their digital future
        </p>
      </div>

      <div className="relative mt-3 sm:mt-5 overflow-hidden">
        <div className="flex w-max gap-3 sm:gap-4 lg:gap-6 animate-marquee">
          {doubled.map((c, i) => (
            <LogoTile key={`${c.name}-${i}`} name={c.name} logo={c.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}