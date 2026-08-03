import InfoCard from "@/app/components/info/InfoCard";
import InfoHero from "@/app/components/info/InfoHero";
import InfoLayout from "@/app/components/info/InfoLayout";

export default function LeveringPage() {
  return (
    <InfoLayout>
      <InfoHero
        eyebrow="PokéDad"
        title="Levering"
        description="Vi pakker alle ordrer med stor omhu, så dine Pokémon-kort ankommer sikkert og i den stand, de forlod os."
      />

      <InfoCard icon="📦" title="Behandling af din ordre">
        <p>
          Vi bestræber os på at behandle alle ordrer hurtigst muligt.
        </p>

        <p>
          Da PokéDad drives ved siden af fuldtidsarbejde og familieliv, kan
          behandlingstiden variere en smule. Vi gør dog altid vores bedste for
          at sende din ordre hurtigst muligt.
        </p>

        <p>
          Hvis din ordre indeholder en forudbestilling, kan hele ordren blive
          sendt samlet, når alle varer er på lager.
        </p>
      </InfoCard>

      <InfoCard icon="🚚" title="Levering">
        <p>
          Leveringsmetoder og fragtpriser vises ved checkout, inden du
          gennemfører dit køb.
        </p>

        <p>
          Din ordre sendes til den pakkeshop eller adresse, du vælger under
          bestillingen.
        </p>

        <p>
          Hvis den valgte pakkeshop er fyldt, kan fragtfirmaet vælge et andet
          udleveringssted i nærheden. Du vil i så fald modtage besked direkte
          fra fragtfirmaet.
        </p>
      </InfoCard>

      <InfoCard icon="🎴" title="Sådan pakker vi dine kort">
        <p>
          Vi ved, hvor vigtigt et korts stand er for samlere.
        </p>

        <p>
          Derfor bliver alle enkeltkort pakket forsvarligt med beskyttende
          emballage, så de er godt beskyttet under transporten.
        </p>

        <p>
          Vi pakker hver ordre, som var det vores egne kort.
        </p>
      </InfoCard>

      <InfoCard icon="📬" title="Hvis der opstår problemer">
        <p>
          Hvis din pakke bliver forsinket, beskadiget eller ikke når frem,
          hjælper vi naturligvis med at finde en løsning.
        </p>

        <p>
          Kontakt os hurtigst muligt på:
        </p>

        <p>
          <a
            href="mailto:sebg@live.dk"
            className="font-semibold text-gray-950 underline underline-offset-4 transition-colors hover:text-gray-600"
          >
            sebg@live.dk
          </a>
        </p>

        <p>
          Husk gerne at oplyse dit ordrenummer.
        </p>
      </InfoCard>

      <InfoCard icon="💙" title="Tak for din støtte">
        <p>
          PokéDad er en lille dansk webshop drevet af to Pokémon-entusiaster.
        </p>

        <p>
          Hver ordre betyder meget for os, og vi sætter stor pris på, at du har
          valgt at handle hos os.
        </p>

        <p>
          Tak fordi du støtter en lille dansk webshop. ❤️
        </p>
      </InfoCard>
    </InfoLayout>
  );
}