import { Helmet } from "react-helmet-async";
import Cover from "../../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg';
import pizzatImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
const Manu = () => {
    const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

    return (
      <div>
        <Helmet>
          <title>Bistro Boss | Menu</title>
        </Helmet>
        <Cover img={menuImg} title={"Our menu"}></Cover>
        {/* main cover */}
        <SectionTitle
          subHeading="Don't Miss"
          heading={`Today's Offer`}
        ></SectionTitle>
        {/* offered menu items */}
        <MenuCategory items={offered}></MenuCategory>

        {/* dessert menu items */}
            <MenuCategory items={desserts} title={'desserts'} img={dessertImg}></MenuCategory>
            {/* pizza menu items */}
            <MenuCategory items={pizza} title={"pizza"} img={pizzatImg}></MenuCategory>
            <MenuCategory items={salad} title={"salad"} img={saladImg}></MenuCategory>
            <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>
      </div>
    );
};

export default Manu;