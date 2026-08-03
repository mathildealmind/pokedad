import InfoCard from "@/app/components/info/InfoCard";
import InfoHero from "@/app/components/info/InfoHero";
import InfoLayout from "@/app/components/info/InfoLayout";

export default function HjaelpPage() {
  return (
    <InfoLayout>
      <InfoHero
        eyebrow="PokéDad"
        title="Hjælpecenter & FAQ"
        description="Her finder du svar på de mest stillede spørgsmål om bestilling, levering, kortenes stand og meget mere."
      />

      <InfoCard icon="🎴" title="Er alle kort ægte?">
        <p>
          Ja. Alle Pokémon-kort, som sælges hos PokéDad, er 100 % originale.
          Vi sælger aldrig kopikort eller uoriginale produkter.
        </p>
      </InfoCard>

      <InfoCard icon="🔍" title="Hvordan vurderer I kortenes stand?">
        <p>
          Vi vurderer alle kort individuelt og bestræber os på at beskrive
          standen så præcist og ærligt som muligt. Eventuelle fejl eller
          brugsspor vil fremgå af produktbeskrivelsen eller billederne.
        </p>
      </InfoCard>

      <InfoCard icon="📦" title="Hvordan bliver kortene pakket?">
        <p>
          Alle kort pakkes omhyggeligt i beskyttende emballage, så de er godt
          beskyttet under transporten. Vi behandler alle kort, som var de vores
          egne.
        </p>
      </InfoCard>

      <InfoCard icon="🚚" title="Hvornår bliver min ordre sendt?">
        <p>
          Vi bestræber os på at sende alle ordrer hurtigst muligt. Da PokéDad
          drives ved siden af fuldtidsarbejde og familieliv, kan behandlingstiden
          variere en smule, men vi gør altid vores bedste for at få din ordre
          afsted så hurtigt som muligt.
        </p>
      </InfoCard>

      <InfoCard icon="💳" title="Hvilke betalingsmetoder accepterer I?">
        <p>
          De tilgængelige betalingsmetoder vises ved checkout, inden du
          gennemfører dit køb.
        </p>
      </InfoCard>

      <InfoCard icon="↩️" title="Kan jeg returnere en vare?">
        <p>
          Ja. Som privatkunde har du 14 dages fortrydelsesret i henhold til
          gældende dansk lovgivning. Du kan læse mere på siden
          <strong> Retur & fortrydelse</strong>.
        </p>
      </InfoCard>

      <InfoCard icon="❓" title="Hvad gør jeg, hvis der er et problem med min ordre?">
        <p>
          Hvis din ordre er blevet beskadiget under transporten, hvis der mangler
          varer, eller hvis du har andre spørgsmål, er du altid velkommen til at
          kontakte os. Vi gør vores bedste for at finde en god løsning.
        </p>
      </InfoCard>

      <InfoCard icon="📧" title="Hvordan kontakter jeg jer?">
        <p>
          Du kan altid skrive til os på:
        </p>

        <p>
          <a
            href="mailto:sebg@live.dk"
            className="font-semibold text-gray-950 underline underline-offset-4 hover:text-gray-600"
          >
            sebg@live.dk
          </a>
        </p>

        <p>
          Vi besvarer alle henvendelser hurtigst muligt.
        </p>
      </InfoCard>

      <InfoCard icon="❤️" title="En lille webshop med stor passion">
        <p>
          PokéDad drives af to Pokémon-entusiaster ved siden af fuldtidsarbejde
          og familieliv. Vi sætter stor pris på din støtte og gør os umage for
          at give dig den bedst mulige oplevelse – fra bestilling til levering.
        </p>
      </InfoCard>
    </InfoLayout>
  );
}