import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import MenuItem from "../../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch(`menu.json`)
            .then(res => res.json())
            .then(data => {
                const populerItems = data.filter(
                  (item) => item.category === "popular"
                );
            setMenu(populerItems)
        })
    },[])

    return (
      <section className="mb-12">
        <SectionTitle
          subHeading="Popular Items"
          heading="From Our Menu"
        ></SectionTitle>

        <div className="grid md:grid-cols-2 gap-10">
          {menu.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
          <button className="btn btn-outline border-0 border-b-4 mt-4">
            View Full Menu
          </button>
      </section>
    );
};

export default PopularMenu;