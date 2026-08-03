import InfoCard from "@/app/components/info/InfoCard";
import InfoHero from "@/app/components/info/InfoHero";
import InfoLayout from "@/app/components/info/InfoLayout";

export default function ReturpolitikPage() {
  return (
    <InfoLayout>
      <InfoHero
        eyebrow="PokéDad"
        title="Retur & fortrydelse"
        description="Her kan du læse, hvordan du fortryder et køb, returnerer en vare eller kontakter os om en fejl ved din ordre."
      />

      <InfoCard icon="↩️" title="14 dages fortrydelsesret">
        <p>
          Når du handler som forbruger hos PokéDad, har du som udgangspunkt
          14 dages fortrydelsesret.
        </p>

        <p>
          Fortrydelsesfristen begynder den dag, hvor du eller en person, du har
          udpeget, modtager varen.
        </p>

        <p>
          Hvis din ordre består af flere varer, som leveres hver for sig,
          begynder fristen den dag, hvor den sidste vare modtages.
        </p>

        <p>
          Du skal give os tydelig besked om, at du ønsker at fortryde købet,
          inden fortrydelsesfristen udløber.
        </p>
      </InfoCard>

      <InfoCard icon="✉️" title="Sådan fortryder du dit køb">
        <p>
          Send en e-mail til os og skriv tydeligt, at du ønsker at benytte din
          fortrydelsesret.
        </p>

        <p>
          Din henvendelse skal som minimum indeholde:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Dit navn.</li>
          <li>Dit ordrenummer.</li>
          <li>Hvilken vare eller ordre du ønsker at returnere.</li>
        </ul>

        <p>
          Send din besked til:
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
          Du behøver ikke oplyse en grund til, at du ønsker at fortryde dit
          køb.
        </p>

        <p>
          Du kan ikke fortryde købet alene ved at undlade at hente pakken eller
          ved at nægte modtagelse uden samtidig at give os tydelig besked.
        </p>
      </InfoCard>

      <InfoCard icon="📦" title="Returnering af varen">
        <p>
          Når du har meddelt os, at du ønsker at fortryde købet, skal varen
          sendes retur uden unødig forsinkelse og senest 14 dage efter din
          meddelelse.
        </p>

        <p>
          Vedlæg gerne en seddel med dit navn og ordrenummer, så vi kan
          identificere din returnering.
        </p>

        <div className="rounded-xl bg-gray-50 p-5">
          <p className="font-semibold text-gray-950">
            Returadresse
          </p>

          <address className="mt-2 not-italic">
            PokéDad
            <br />
            Høje Gladsaxe 3, 15. tv.
            <br />
            2860 Søborg
          </address>
        </div>

        <p>
          Vi modtager ikke pakker sendt pr. efterkrav eller uden omdeling.
        </p>
      </InfoCard>

      <InfoCard icon="💳" title="Omkostninger ved returnering">
        <p>
          Du betaler selv de direkte udgifter til returneringen, når du
          benytter din fortrydelsesret.
        </p>

        <p>
          Hvis returneringen skyldes en berettiget reklamation, dækker PokéDad
          de rimelige returneringsomkostninger.
        </p>

        <p>
          Vi anbefaler, at du sender pakken med sporing og gemmer din
          indleveringskvittering, indtil returneringen er afsluttet.
        </p>
      </InfoCard>

      <InfoCard icon="🛡️" title="Pak varen forsvarligt">
        <p>
          Du er ansvarlig for varen, fra du modtager den, og indtil vi har
          modtaget den retur.
        </p>

        <p>
          Varen skal derfor pakkes forsvarligt, så den ikke bliver beskadiget
          under transporten.
        </p>

        <p>
          Samlekort bør returneres i samme beskyttende emballage, som de blev
          leveret i, eller i tilsvarende sikker emballage.
        </p>

        <p>
          Undlad at sætte tape, labels eller anden emballage direkte på varens
          originale indpakning.
        </p>
      </InfoCard>

      <InfoCard icon="✨" title="Varens stand">
        <p>
          Du må undersøge varen på samme måde, som du ville kunne i en fysisk
          butik.
        </p>

        <p>
          Du hæfter kun for en eventuel værdiforringelse, der skyldes anden
          håndtering end den, der er nødvendig for at fastslå varens art,
          egenskaber og funktion.
        </p>

        <p>
          Hvis varen er blevet beskadiget, taget unødigt i brug eller håndteret
          på en måde, der reducerer dens handelsmæssige værdi, kan der blive
          trukket et beløb fra tilbagebetalingen.
        </p>

        <p>
          For samlekort kan ridser, bøjninger, mærker, beskadigede hjørner eller
          anden ændring af kortets stand medføre en værdiforringelse.
        </p>
      </InfoCard>

      <InfoCard icon="🎴" title="Forseglede produkter">
        <p>
          Forseglede produkter bør returneres med den originale forsegling og
          emballage intakt, hvis du ønsker at modtage hele købsbeløbet retur.
        </p>

        <p>
          Hvis emballagen eller forseglingen er brudt, vurderer vi varens
          aktuelle handelsmæssige værdi. En dokumenteret værdiforringelse kan
          blive fratrukket tilbagebetalingen.
        </p>

        <p>
          En brudt forsegling betyder ikke nødvendigvis, at
          fortrydelsesretten automatisk bortfalder.
        </p>
      </InfoCard>

      <InfoCard icon="💰" title="Tilbagebetaling">
        <p>
          Når du fortryder dit køb, tilbagebetaler vi de betalinger, vi har
          modtaget fra dig for de returnerede varer.
        </p>

        <p>
          Ved fortrydelse af hele ordren refunderer vi også prisen for den
          billigste standardlevering, som blev tilbudt ved købet.
        </p>

        <p>
          Hvis du har valgt en dyrere leveringsform end vores billigste
          standardlevering, refunderes den ekstra leveringsomkostning ikke.
        </p>

        <p>
          Tilbagebetalingen gennemføres uden unødig forsinkelse og senest
          14 dage efter, at vi har modtaget din meddelelse om fortrydelse.
        </p>

        <p>
          Vi kan tilbageholde tilbagebetalingen, indtil vi har modtaget varen,
          eller indtil du har fremlagt dokumentation for, at den er sendt
          retur.
        </p>

        <p>
          Pengene tilbageføres som udgangspunkt med samme betalingsmiddel, som
          blev anvendt ved købet, medmindre andet er aftalt.
        </p>
      </InfoCard>

      <InfoCard icon="⚠️" title="Fejl, mangler eller forkert vare">
        <p>
          Hvis varen er beskadiget, mangelfuld eller ikke svarer til det, du
          har bestilt, skal du kontakte os hurtigst muligt.
        </p>

        <p>
          Send en e-mail til{" "}
          <a
            href="mailto:sebg@live.dk"
            className="font-semibold text-gray-950 underline underline-offset-4 transition-colors hover:text-gray-600"
          >
            sebg@live.dk
          </a>{" "}
          med:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Dit navn.</li>
          <li>Dit ordrenummer.</li>
          <li>En beskrivelse af problemet.</li>
          <li>Tydelige billeder af varen og emballagen.</li>
        </ul>

        <p>
          Send ikke varen retur, før du har modtaget svar og nærmere
          instruktioner fra os.
        </p>
      </InfoCard>

      <InfoCard icon="🧾" title="Reklamationsret">
        <p>
          Du har 2 års reklamationsret i henhold til købeloven, når du handler
          som forbruger hos PokéDad.
        </p>

        <p>
          Reklamationsretten omfatter fejl og mangler, der var til stede ved
          leveringen, eller hvor årsagen til fejlen var til stede på
          leveringstidspunktet.
        </p>

        <p>
          Reklamationsretten dækker ikke skader, der skyldes forkert
          håndtering, forkert opbevaring, uheld eller almindelig slitage.
        </p>

        <p>
          Afhængigt af den konkrete situation kan løsningen være omlevering,
          afhjælpning, et forholdsmæssigt afslag eller tilbagebetaling.
        </p>
      </InfoCard>

      <InfoCard icon="📧" title="Kontakt os">
        <p>
          Har du spørgsmål til returnering, fortrydelse eller reklamation, er
          du velkommen til at kontakte os.
        </p>

        <p>
          <strong>E-mail:</strong>{" "}
          <a
            href="mailto:sebg@live.dk"
            className="font-semibold text-gray-950 underline underline-offset-4 transition-colors hover:text-gray-600"
          >
            sebg@live.dk
          </a>
        </p>

        <p>
          Husk at oplyse dit ordrenummer, så vi hurtigere kan hjælpe dig.
        </p>
      </InfoCard>
    </InfoLayout>
  );
}