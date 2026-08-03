import InfoCard from "@/app/components/info/InfoCard";
import InfoHero from "@/app/components/info/InfoHero";
import InfoLayout from "@/app/components/info/InfoLayout";

export default function MineOrdrerPage() {
  return (
    <InfoLayout>
      <InfoHero
        eyebrow="PokéDad"
        title="Mine ordrer"
        description="Her finder du information om din ordre, ordrebekræftelse og hvad du kan gøre, hvis du har spørgsmål."
      />

      <InfoCard icon="🛒" title="Efter din bestilling">
        <p>
          Når du gennemfører en ordre hos PokéDad, modtager du en
          ordrebekræftelse på den e-mailadresse, du har angivet ved købet.
        </p>

        <p>
          Ordrebekræftelsen indeholder en oversigt over de varer, du har købt,
          samt dine ordreoplysninger.
        </p>
      </InfoCard>

      <InfoCard icon="📦" title="Ordrebehandling">
        <p>
          Vi behandler alle ordrer hurtigst muligt og pakker dem med stor omhu.
        </p>

        <p>
          Da PokéDad drives af to personer ved siden af fuldtidsarbejde og
          familieliv, kan behandlingstiden variere en smule. Vi gør dog altid
          vores bedste for at sende din ordre hurtigst muligt.
        </p>
      </InfoCard>

      <InfoCard icon="🚚" title="Når ordren er sendt">
        <p>
          Når din ordre er afsendt, modtager du en besked med oplysninger om
          leveringen, hvis dette tilbydes af den valgte fragtmetode.
        </p>

        <p>
          Herefter overtager fragtfirmaet leveringen af din pakke.
        </p>
      </InfoCard>

      <InfoCard icon="❓" title="Har du spørgsmål til din ordre?">
        <p>
          Hvis du har spørgsmål til en eksisterende ordre, er du altid
          velkommen til at kontakte os.
        </p>

        <p>
          For at vi hurtigst muligt kan hjælpe dig, må du gerne oplyse:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Ordrenummer</li>
          <li>Navnet på bestillingen</li>
          <li>En kort beskrivelse af dit spørgsmål</li>
        </ul>
      </InfoCard>

      <InfoCard icon="📧" title="Kontakt os">
        <p>
          Har du brug for hjælp, kan du altid skrive til os på:
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
          Vi bestræber os på at besvare alle henvendelser hurtigst muligt.
        </p>
      </InfoCard>

      <InfoCard icon="❤️" title="Tak fordi du handler hos PokéDad">
        <p>
          Hver eneste ordre betyder meget for os. Som en lille dansk webshop
          sætter vi stor pris på den tillid, du viser os ved at handle hos
          PokéDad.
        </p>

        <p>
          Tak fordi du er med til at støtte vores passion for Pokémon. ❤️
        </p>
      </InfoCard>
    </InfoLayout>
  );
}