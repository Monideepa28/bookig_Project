import useFetch from "../../hooks/useFetch.js";
import "./featured.css";


const Featured = () => {

  const { data, loading, error } = useFetch("/hotels/countByCity?cities=Kyoto,Switzerland,Mexico");

  return (
    <div className="featured">
      {loading ? ("Loading.. Please wait..") : (
        <><div className="featuredItem">
          <img 
            src="https://media.tacdn.com/media/attractions-content--1x-1/10/29/d5/01.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>Kyoto</h1>
            <h2>{data[0]} properties</h2>
          </div>
        </div>
          <div className="featuredItem">
            <img
              src="https://images-ext-2.discordapp.net/external/knrPc9DV7GMl2qIn4CZLgqawNJqi9L6PlOPyjoJ3y8c/https/www.travelandleisure.com/thmb/wAqGdol8_AsJJ40bKfjU_O3EHGk%3D/750x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29%3Aformat%28webp%29/TAL-header-zermatt-switzerland-ZERMATT0123-08b7127082434b9f83db57251c051c1b.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Switzerland</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mexico</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div></>
      )}
    </div>
  );
};

export default Featured;