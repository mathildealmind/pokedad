import InfoCard from "@/app/components/info/InfoCard";
import InfoHero from "@/app/components/info/InfoHero";
import InfoLayout from "@/app/components/info/InfoLayout";

export default function HandelsbetingelserPage() {
  return (
    <InfoLayout>
      <InfoHero
        eyebrow="PokéDad"
        title="Handelsbetingelser"
        description="Her finder du information om betaling, levering, reklamation, fortrydelse og returnering, når du handler hos PokéDad."
      />

      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        Handelsbetingelserne opdateres med CVR-nummer, virksomhedsform,
        betalingsmuligheder, fragtpriser og leveringspartnere, inden webshoppen
        åbner for salg.
      </div>

      <InfoCard icon="🏪" title="Generelle oplysninger">
        <div className="space-y-1">
          <p className="font-semibold text-gray-900">PokéDad</p>
          <p>Høje Gladsaxe 3, 15. tv.</p>
          <p>2860 Søborg</p>
          <p>
            <strong>E-mail:</strong>{" "}
            <a
              href="mailto:sebg@live.dk"
              className="font-medium text-gray-950 underline underline-offset-4 hover:text-gray-600"
            >
              sebg@live.dk
            </a>
          </p>
        </div>
      </InfoCard>

      <InfoCard icon="💳" title="Betaling">
        <p>
          De tilgængelige betalingsmuligheder fremgår ved checkout, inden du
          gennemfører din bestilling.
        </p>

        <p>
          Alle priser på webshoppen er angivet i danske kroner (DKK) og
          inklusive moms, medmindre andet tydeligt fremgår.
        </p>

        <p>
          Betalingen hæves som udgangspunkt først, når din ordre afsendes. Ved
          forudbestillinger eller andre særlige produkter kan der gælde andre
          betalingsvilkår. Det vil i så fald fremgå tydeligt, inden købet
          gennemføres.
        </p>

        <p>
          Der kan aldrig trækkes et større beløb end det, du har godkendt ved
          bestillingen.
        </p>
      </InfoCard>

      <InfoCard icon="📦" title="Levering">
        <p>
          Vi bestræber os på at behandle og afsende lagervarer hurtigst muligt.
          Den forventede leveringstid fremgår ved checkout eller på den
          relevante produktside.
        </p>

        <p>
          Tilgængelige leveringsmetoder, fragtfirmaer og fragtpriser vises,
          inden du gennemfører din bestilling.
        </p>

        <p>
          Varen leveres til den pakkeshop eller adresse, du vælger under
          bestillingen, medmindre andet er aftalt.
        </p>

        <p>
          Hvis den valgte pakkeshop er fyldt eller midlertidigt utilgængelig,
          kan fragtfirmaet flytte pakken til et andet udleveringssted i
          nærheden. Du vil normalt modtage besked direkte fra fragtfirmaet.
        </p>

        <p>
          Hvis din ordre indeholder en forudbestilling, kan hele ordren blive
          sendt samlet, når alle varer er på lager. Eventuelle særlige
          leveringsvilkår vil fremgå inden købet.
        </p>
      </InfoCard>

      <InfoCard icon="🛡️" title="Reklamationsret">
        <p>
          Når du handler som forbruger hos PokéDad, har du 2 års
          reklamationsret i henhold til købeloven.
        </p>

        <p>
          Reklamationsretten omfatter fejl og mangler, der var til stede ved
          leveringen, eller som skyldes varen. Den omfatter ikke skader, der er
          opstået som følge af forkert opbevaring, uhensigtsmæssig brug,
          almindelig slitage eller anden forkert håndtering.
        </p>

        <p>
          Afhængigt af den konkrete situation kan du have ret til afhjælpning,
          omlevering, et passende afslag i prisen eller tilbagebetaling.
        </p>

        <p>
          Du skal kontakte os inden for rimelig tid efter, at du har opdaget
          fejlen eller manglen. En reklamation inden for 2 måneder efter, at
          manglen er opdaget, vil som udgangspunkt altid være rettidig.
        </p>

        <p>
          Er reklamationen berettiget, refunderer vi dine rimelige
          returneringsomkostninger.
        </p>

        <p>
          Kontakt os på{" "}
          <a
            href="mailto:sebg@live.dk"
            className="font-medium text-gray-950 underline underline-offset-4 hover:text-gray-600"
          >
            sebg@live.dk
          </a>{" "}
          og oplys dit ordrenummer samt en beskrivelse af problemet. Vedhæft
          gerne tydelige billeder.
        </p>
      </InfoCard>

      <InfoCard icon="↩️" title="Fortrydelsesret">
        <p>
          Som forbruger har du som udgangspunkt 14 dages fortrydelsesret, når
          du handler på nettet.
        </p>

        <p>
          Fortrydelsesfristen løber som udgangspunkt fra den dag, hvor du eller
          en person, du har udpeget, modtager varen.
        </p>

        <p>
          Hvis en ordre indeholder flere varer, som leveres hver for sig,
          begynder fristen som udgangspunkt den dag, hvor den sidste vare
          modtages.
        </p>

        <p>
          Du skal give os en tydelig meddelelse om, at du ønsker at fortryde
          købet, inden fristen udløber. Det kan du gøre ved at skrive til{" "}
          <a
            href="mailto:sebg@live.dk"
            className="font-medium text-gray-950 underline underline-offset-4 hover:text-gray-600"
          >
            sebg@live.dk
          </a>
          .
        </p>

        <p>
          Skriv dit navn og ordrenummer i meddelelsen. Du behøver ikke oplyse
          en grund til, at du fortryder købet.
        </p>

        <p>
          Du kan ikke fortryde købet alene ved at undlade at hente pakken eller
          ved at nægte modtagelse uden samtidig at give os tydelig besked.
        </p>
      </InfoCard>

      <InfoCard icon="📮" title="Sådan returnerer du">
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            Send en e-mail til{" "}
            <a
              href="mailto:sebg@live.dk"
              className="font-medium text-gray-950 underline underline-offset-4 hover:text-gray-600"
            >
              sebg@live.dk
            </a>{" "}
            senest 14 dage efter modtagelsen.
          </li>

          <li>
            Oplys dit navn og ordrenummer, og skriv tydeligt, at du ønsker at
            benytte din fortrydelsesret.
          </li>

          <li>
            Send varen retur uden unødig forsinkelse og senest 14 dage efter,
            at du har meddelt os, at du fortryder købet.
          </li>

          <li>
            Vedlæg dit navn og ordrenummer i pakken, så vi kan identificere
            returneringen.
          </li>
        </ol>

        <div className="mt-5 rounded-xl bg-gray-50 p-5">
          <p className="font-semibold text-gray-900">Returadresse</p>
          <p className="mt-2">
            PokéDad
            <br />
            Høje Gladsaxe 3, 15. tv.
            <br />
            2860 Søborg
          </p>
        </div>

        <p>
          Du betaler selv de direkte omkostninger ved returneringen, medmindre
          andet er aftalt, eller returneringen skyldes en berettiget
          reklamation.
        </p>

        <p>
          Du har ansvaret for, at varen pakkes forsvarligt. Du bærer risikoen
          for varen, indtil vi har modtaget den retur.
        </p>

        <p>Vi modtager ikke pakker sendt pr. efterkrav.</p>
      </InfoCard>

      <InfoCard icon="✨" title="Varens stand ved returnering">
        <p>
          Du hæfter kun for en eventuel værdiforringelse, der skyldes anden
          håndtering end den, der er nødvendig for at fastslå varens art,
          egenskaber og funktion.
        </p>

        <p>
          Samlekort og tilbehør skal returneres forsvarligt emballeret. Kort,
          emballage, æsker, indpakning og eventuelt medfølgende tilbehør bør
          returneres i samme stand som ved modtagelsen.
        </p>

        <p>
          Hvis varen er håndteret mere, end hvad der er nødvendigt for at
          undersøge den, kan vi foretage et fradrag svarende til varens
          værdiforringelse.
        </p>
      </InfoCard>

      <InfoCard icon="💰" title="Tilbagebetaling">
        <p>
          Når du benytter fortrydelsesretten, tilbagebetaler vi de betalinger,
          vi har modtaget fra dig, herunder udgiften til den billigste
          standardlevering, som blev tilbudt ved købet.
        </p>

        <p>
          Eventuelle ekstra leveringsomkostninger, som skyldes dit valg af en
          dyrere leveringsform end vores billigste standardlevering, refunderes
          ikke.
        </p>

        <p>
          Tilbagebetalingen sker uden unødig forsinkelse og som udgangspunkt
          senest 14 dage efter, at vi har modtaget din meddelelse om
          fortrydelse.
        </p>

        <p>
          Vi kan tilbageholde tilbagebetalingen, indtil vi har modtaget varen
          retur, eller indtil du har fremlagt dokumentation for, at varen er
          sendt retur.
        </p>

        <p>
          Tilbagebetalingen gennemføres som udgangspunkt med samme
          betalingsmiddel, som blev anvendt ved købet, medmindre andet
          udtrykkeligt er aftalt.
        </p>
      </InfoCard>

      <InfoCard icon="🚫" title="Undtagelser fra fortrydelsesretten">
        <p>
          Fortrydelsesretten gælder ikke i de tilfælde, hvor lovgivningen
          undtager varen eller ydelsen. Det kan blandt andet være:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            Varer, der er fremstillet efter dine specifikationer eller har fået
            et tydeligt personligt præg.
          </li>

          <li>
            Forseglede varer, der af sundheds- eller hygiejnemæssige årsager
            ikke er egnede til returnering, når forseglingen er brudt efter
            leveringen.
          </li>

          <li>Varer, der forringes eller forældes hurtigt.</li>

          <li>
            Digitalt indhold, som ikke leveres på et fysisk medium, når
            leveringen er påbegyndt med dit udtrykkelige samtykke og din
            anerkendelse af, at fortrydelsesretten dermed bortfalder.
          </li>

          <li>
            Tjenesteydelser, der er fuldt udført med dit udtrykkelige samtykke
            og din anerkendelse af, at fortrydelsesretten ophører, når ydelsen
            er fuldt udført.
          </li>
        </ul>

        <p>
          Det vil fremgå tydeligt inden købet, hvis en konkret vare eller
          ydelse ikke er omfattet af fortrydelsesretten.
        </p>
      </InfoCard>

      <InfoCard icon="📧" title="Fejl i leveringen">
        <p>
          Modtager du en forkert vare, eller mangler der noget i din ordre, skal
          du kontakte os hurtigst muligt.
        </p>

        <p>
          Skriv til{" "}
          <a
            href="mailto:sebg@live.dk"
            className="font-medium text-gray-950 underline underline-offset-4 hover:text-gray-600"
          >
            sebg@live.dk
          </a>{" "}
          med dit ordrenummer og en beskrivelse af problemet. Vedhæft gerne
          billeder af varen, emballagen og pakkens label.
        </p>
      </InfoCard>

      <InfoCard icon="⚖️" title="Klagemuligheder">
        <p>
          Hvis vi ikke kan finde en løsning sammen, kan du undersøge
          mulighederne for at indgive en klage gennem Nævnenes Hus.
        </p>

        <p>
          En klage kan indgives til:
        </p>

        <address className="not-italic">
          Nævnenes Hus
          <br />
          Toldboden 2
          <br />
          8800 Viborg
        </address>

        <p>
          Du kan læse mere om betingelserne og benytte Klageportalen på{" "}
          <a
            href="https://naevneneshus.dk"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gray-950 underline underline-offset-4 hover:text-gray-600"
          >
            Nævnenes Hus
          </a>
          .
        </p>
      </InfoCard>

      <InfoCard icon="📝" title="Ændringer i handelsbetingelserne">
        <p>
          PokéDad kan løbende opdatere handelsbetingelserne. Det er de
          handelsbetingelser, der var gældende på tidspunktet for din
          bestilling, som gælder for købet.
        </p>

        <p className="text-sm text-gray-500">
          Senest opdateret: 28. juli 2026
        </p>
      </InfoCard>
    </InfoLayout>
  );
}