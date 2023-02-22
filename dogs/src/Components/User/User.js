import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../NotFound";
import Feed from "../Feed/Feed";
import Head from "../Helper/Head";
import UserHeader from "./UserHeader";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";

function User() {

  const {data} = useSelector(state => state.user)

  return (
    <section className="container">
      <Head title="Fotos" description="Home do site dogs, com o feed de fotos"/>
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />}/>
        <Route path="/photo" element={<UserPhotoPost />} />
        <Route path="/stats" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default User;
