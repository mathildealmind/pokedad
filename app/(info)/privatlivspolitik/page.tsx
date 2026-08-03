import InfoCard from "@/app/components/info/InfoCard";
import InfoHero from "@/app/components/info/InfoHero";
import InfoLayout from "@/app/components/info/InfoLayout";
export default function PrivatlivspolitikPage() {
  return (
    <InfoLayout>
      <InfoHero
        eyebrow="PokéDad"
        title="Privatlivspolitik"
        description="Vi passer godt på dine personoplysninger. Her kan du læse, hvilke oplysninger vi indsamler, hvordan de behandles, og hvilke rettigheder du har."
      />

      <InfoCard icon="🍪" title="Cookies">
        <p>
          PokéDad anvender cookies til at sikre, at webshoppen fungerer
          korrekt, huske dine indstillinger, forbedre brugeroplevelsen og
          udarbejde statistik.
        </p>

        <p>
          Cookies er små tekstfiler, der gemmes på din computer, tablet eller
          mobil. De kan ikke indeholde virus eller anden skadelig kode.
        </p>

        <p>
          Du kan til enhver tid slette eller blokere cookies via din browser.
          Vær opmærksom på, at visse funktioner på hjemmesiden herefter kan
          være begrænsede.
        </p>
      </InfoCard>

      <InfoCard icon="👤" title="Personoplysninger">
        <p>
          Når du handler hos PokéDad eller benytter vores hjemmeside, kan vi
          behandle oplysninger som:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Navn</li>
          <li>Adresse</li>
          <li>E-mailadresse</li>
          <li>Telefonnummer</li>
          <li>Betalingsoplysninger</li>
          <li>IP-adresse</li>
          <li>Browser- og enhedsoplysninger</li>
        </ul>
      </InfoCard>

      <InfoCard icon="🎯" title="Formål">
        <ul className="list-disc space-y-2 pl-6">
          <li>Behandling af dine ordrer.</li>
          <li>Levering af varer.</li>
          <li>Kundeservice.</li>
          <li>Forbedring af webshoppen.</li>
          <li>Administration af din brugerprofil.</li>
          <li>Overholdelse af gældende lovgivning.</li>
        </ul>
      </InfoCard>

      <InfoCard icon="🔒" title="Sikkerhed">
        <p>
          Vi behandler dine personoplysninger fortroligt og i overensstemmelse
          med Databeskyttelsesforordningen (GDPR) og den danske
          databeskyttelseslov.
        </p>

        <p>
          Vi har truffet passende tekniske og organisatoriske
          sikkerhedsforanstaltninger for at beskytte dine oplysninger mod
          misbrug, tab og uautoriseret adgang.
        </p>
      </InfoCard>

      <InfoCard icon="📦" title="Opbevaring">
        <p>
          Vi opbevarer kun dine oplysninger så længe, det er nødvendigt for at
          opfylde formålet med behandlingen eller så længe, lovgivningen
          kræver det.
        </p>
      </InfoCard>

      <InfoCard icon="🤝" title="Videregivelse">
        <p>
          Personoplysninger videregives kun til samarbejdspartnere, når det er
          nødvendigt for at gennemføre din ordre eller levere vores services.
        </p>

        <p>Det kan eksempelvis være:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Betalingsudbydere</li>
          <li>Fragtfirmaer</li>
          <li>Hosting- og IT-leverandører</li>
        </ul>

        <p>
          PokéDad sælger aldrig dine personoplysninger.
        </p>
      </InfoCard>

      <InfoCard icon="⚖️" title="Dine rettigheder">
        <p>Du har blandt andet ret til:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Indsigt i dine oplysninger.</li>
          <li>Rettelse af urigtige oplysninger.</li>
          <li>Sletning af oplysninger.</li>
          <li>Dataportabilitet.</li>
          <li>At gøre indsigelse mod behandlingen.</li>
          <li>At tilbagekalde dit samtykke.</li>
        </ul>
      </InfoCard>

      <InfoCard icon="✉️" title="Kontakt">
        <p>
          Har du spørgsmål om vores behandling af personoplysninger, er du
          altid velkommen til at kontakte os.
        </p>

        <p>
          <strong>E-mail:</strong> sebg@live.dk
        </p>

        <p>
          <strong>Adresse:</strong>
          <br />
          PokéDad
          <br />
          Høje Gladsaxe 3, 15 tv
          <br />
          2860 Søborg
        </p>
      </InfoCard>
    </InfoLayout>
  );
}