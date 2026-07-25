import OfferHero from "../components/offers/OfferHero";
import Countdown from "../components/offers/Countdown";
import FlashSale from "../components/offers/FlashSale";
import OfferBanner from "../components/offers/OfferBanner";

export default function Offers() {
  return (
    <div>
      <OfferHero />
      <Countdown />
      <FlashSale />
      <OfferBanner />
    </div>
  );
}
