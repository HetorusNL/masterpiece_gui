import React, { Fragment, useEffect, useState } from "react";
import packageJson from "../../../package.json";
import { apiUpdateDatabase } from "../utils/MasterpieceAPI";

const About = () => {
  const [version, setVersion] = useState("loading build date/time...");
  const [dbUpdateStatus, setDbUpdateStatus] = useState("no update performed");

  useEffect(() => {
    fetch("/meta.json", { cache: "no-store" })
      .then((response) => response.json())
      .then((meta) => {
        setVersion(meta.buildDateTime);
      });
  }, []);

  // update the Masterpiece database
  const actionUpdateDatabase = async () => {
    setDbUpdateStatus("updating database...");
    const res = await apiUpdateDatabase();
    const updateResult = res.data.result || "failure";
    setDbUpdateStatus(updateResult);
  };

  return (
    <Fragment>
      <h1>About this website</h1>
      <p>
        The vocabulary of the English-Dutch words is available using this site.
        It's possible to find the words of a specific course or by searching all
        words.
      </p>
      <p>
        Front-end dashboard application for the masterpiece API and database
      </p>
      <p>
        <i>Version: {packageJson.version}</i>
      </p>
      <p>
        <i>Build date/time (local timezone): {version}</i>
      </p>
      <br></br>
      <div>
        <div className="btn" onClick={() => actionUpdateDatabase()}>
          Update database
        </div>
        Database update result: {dbUpdateStatus}
      </div>
    </Fragment>
  );
};

export default About;
