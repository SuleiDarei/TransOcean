import { homepage } from "@/content/homepage";
import { Text } from "@/components/primitives/Type";
import { Button } from "@/components/primitives/Button";
import Image from "next/image";

export function PeopleInterlude() {
  return (
    <section className="people-ship" aria-labelledby="people-title">
      <div className="people-ship__field" aria-hidden="true">
        <Image
          src="/media/bands/gm-cta.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 78%" }}
        />
      </div>
      <div className="people-copy">
        <div className="people-copy__block text-limestone">
          <h2 id="people-title" className="t-display-m" data-placeholder="true">
            {homepage.people.heading}
          </h2>
          <Text variant="body" className="mt-6 text-limestone" meta={homepage.people.meta}>
            {homepage.people.body}
          </Text>
          <div className="mt-8">
            <Button href="/about" surface="dark">
              {homepage.people.link}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
