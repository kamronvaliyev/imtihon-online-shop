import React, { useEffect, useState } from "react";
import "./Categories.scss";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import getUrlParams from "../../helpers/getUrlParam";
export default function Categories() {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://api.escuelajs.co/api/v1/categories/",
          {
            params: {
              limit: 5,
            },
          }
        );
        setPages(res?.data);
        return res;
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
    // return () => {
    //   axios.get("https://api.escuelajs.co/api/v1/categories/", {
    //     params: {
    //       limit: 5
    //     }
    //   }).then((res) => res?.data).then((data) => setPages(data)).catch(error => setError(error))
    // }
  }, []);

  return (
    <>
      <section className="categories">
        <h2 className="categories__heading">Product Categories</h2>
        <div className="categories__filter">
          <input
            value={searchParams.get("title") || ""}
            onChange={(evt) =>
              setSearchParams(
                getUrlParams("title", evt.target.value, searchParams)
              )
            }
            className="categories__search"
            name="search"
            type="search"
            placeholder="Search..."
          />
          <div className="categories__price--box">
            <p>Price</p>
            <div className="categories__price--search">
              <div className="categories__price--boxes">
                <span>$</span>
                <input
                  value={searchParams.get("price_min") ?? ""}
                  onChange={(evt) =>
                    setSearchParams(
                      getUrlParams("price_min", evt.target.value, searchParams)
                    )
                  }
                  className="categories__input"
                  type="number"
                  placeholder="From"
                />
              </div>
              <div className="categories__price--boxes">
                <span>$</span>
                <input
                  value={searchParams.get("price_max") ?? ""}
                  onChange={(evt) =>
                    setSearchParams(
                      getUrlParams("price_max", evt.target.value, searchParams)
                    )
                  }
                  className="categories__input"
                  type="number"
                  placeholder="To"
                />
              </div>
            </div>
          </div>
        </div>
        {error && <pre>{error.tostring()}</pre>}
        <div className="categories__pages">
          {pages &&
            pages.map((page) => (
              <button
                onClick={() => navigate(`/categories/${page.id}`)}
                key={page.id}
                className="categories__pages--btn"
              >
                {page.name}
              </button>
            ))}
        </div>
      </section>
    </>
  );
}
 