import { homepage } from "@/content/homepage";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { Text } from "@/components/primitives/Type";
import { Button } from "@/components/primitives/Button";
import { ScrollFrame } from "@/components/motion/ScrollFrame";

export function PeopleInterlude() {
  return (
    <section className="people-ship" aria-labelledby="people-title">
      <div className="people-ship__field" aria-hidden="true">
        <ScrollFrame><ResponsiveImage id="GM-17" sizes="100vw" decorative /></ScrollFrame>
      </div>
      <div className="people-copy">
        <div className="people-copy__block text-water">
          <h2 id="people-title" className="t-display-m" data-placeholder="true">
            {homepage.people.heading}
          </h2>
          <Text variant="body" className="mt-6 text-water" meta={homepage.people.meta}>
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
