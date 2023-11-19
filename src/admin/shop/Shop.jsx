import React, { useEffect, useState } from "react";
import EditShop from "./EditShop";
import ListShop from "./ListShop";
import { useDispatch, useSelector } from "react-redux";
import ShopService from "../../service/ShopService";
import { getAllShop } from "../../service/Actions";
import style from "../../css/business/product.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListShopWait from "./ListShopWait";
import { useLocation } from "react-router";
import ShopDetail from "./Shopdetail";
import { useNavigate } from "react-router-dom";
function Shop() {
  const dispatch = useDispatch();
  const idShop = useSelector((state) => state.idShop);
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const location = useLocation();
  const isActiveShop = location.pathname === "/admin/shops";
  const isActiveShopDetail = location.pathname === "/admin/shop/shopdetail";
  const navigate = useNavigate();
  useEffect(() => {
    getdataShop();
  }, [idShop]);

  const getdataShop = async () => {
    const reponse = await ShopService.getAllshop();
    console.log('account', reponse)
    dispatch(getAllShop(reponse.data));
  };

  return (
    <React.Fragment>
      <div className={`${style.card}`}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab
                  sx={{
                    textTransform: "none",
                    "&.Mui-selected": {
                      fontWeight: "bold"
                    }
                  }}
                  label="Tất cả"
                  value="1"
                />
                <Tab
                  sx={{
                    textTransform: "none",
                    "&.Mui-selected": {
                      fontWeight: "bold"
                    }
                  }}
                  label="Đang chờ duyệt"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ListShop />
            </TabPanel>
            <TabPanel value="2">
              <ListShopWait />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </React.Fragment>
  );
}

export default Shop;
