import InfoCard from "@/app/components/info/InfoCard";
import InfoHero from "@/app/components/info/InfoHero";
import InfoLayout from "@/app/components/info/InfoLayout";

export default function KontaktPage() {
  return (
    <InfoLayout>
      <InfoHero
        eyebrow="PokéDad"
        title="Kontakt os"
        description="Har du spørgsmål til en ordre, et Pokémon-kort eller noget helt tredje? Du er altid velkommen til at kontakte os."
      />

      <InfoCard icon="📧" title="Kontaktoplysninger">
        <p>
          Du er altid velkommen til at kontakte os via e-mail. Vi bestræber os
          på at besvare alle henvendelser hurtigst muligt.
        </p>

        <p>
          <strong>E-mail:</strong>
          <br />
          <a
            href="mailto:sebg@live.dk"
            className="font-semibold text-gray-950 underline underline-offset-4 hover:text-gray-600"
          >
            sebg@live.dk
          </a>
        </p>

        <p>
          <strong>Lokation:</strong>
          <br />
          Søborg, Danmark
        </p>
      </InfoCard>

      <InfoCard icon="💬" title="Hvad kan vi hjælpe med?">
        <p>Du er velkommen til at kontakte os, hvis du har spørgsmål om:</p>

        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Pokémon-kortenes stand</li>
          <li>Din ordre</li>
          <li>Levering og forsendelse</li>
          <li>Betaling</li>
          <li>Returnering og reklamation</li>
          <li>Generelle spørgsmål om Pokémon-kort</li>
        </ul>
      </InfoCard>

      <InfoCard icon="⏰" title="Svartid">
        <p>
          Vi bestræber os på at besvare alle henvendelser så hurtigt som muligt.
        </p>

        <p>
          PokéDad drives af to personer ved siden af fuldtidsarbejde og
          familieliv. Derfor kan svartiden i perioder være en smule længere,
          men vi vender altid tilbage hurtigst muligt.
        </p>

        <p>
          Tak for din forståelse og tålmodighed. Vi sætter stor pris på, at du
          har valgt at kontakte os.
        </p>
      </InfoCard>

      <InfoCard icon="❤️" title="Tak fordi du besøger PokéDad">
        <p>
          Hver besked og hver ordre betyder meget for os. Vi gør os umage for
          at give dig en personlig og tryg oplevelse – fra første spørgsmål til
          pakken lander hos dig.
        </p>

        <p>
          Tak fordi du støtter en lille dansk webshop med stor passion for
          Pokémon. ❤️
        </p>
      </InfoCard>
    </InfoLayout>
  );
}