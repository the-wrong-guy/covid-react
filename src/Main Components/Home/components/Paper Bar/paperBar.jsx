import React, { useState, useEffect } from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import styles from "./paperBar.module.css";
import Red from "@material-ui/core/colors/red";
import Green from "@material-ui/core/colors/green";
import Orange from "@material-ui/core/colors/deepOrange";
import numeral from "numeral";

const PaperBar = ({ title, data }) => {
  const [TestPerMillon, setTestPerMillon] = useState("");
  const [TotalSamplesTested, setTotalSamplesTested] = useState("");
  const [PositivityRate, setPositivityRate] = useState("");

  useEffect(() => {
    fetch("https://api.covid19india.org/data.json")
      .then((response) => response.json())
      .then((data) => {
        let localdta = data.tested[data.tested.length - 1];
        // console.log(localdta)
        setPositivityRate(localdta.testpositivityrate);
        setTestPerMillon(localdta.testspermillion);
        setTotalSamplesTested(localdta.totalsamplestested);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.paperContainer}>
        {TestPerMillon && (
          <Paper elevation={15} className={styles.paper}>
            <div>
              <Typography
                variant='subtitle1'
                style={{ color: `${Green[500]}`, fontWeight: "700" }}
              >
                Tests per million
              </Typography>
            </div>
            <div>
              <Typography
                variant='subtitle1'
                style={{ color: `${Green[500]}` }}
              >
                {numeral(TestPerMillon).format("0a")}
              </Typography>
            </div>
          </Paper>
        )}
      </div>
      <div className={styles.paperContainer}>
        {TotalSamplesTested && (
          <Paper elevation={15} className={styles.paper}>
            <div>
              <Typography
                variant='subtitle1'
                style={{ color: `${Orange[500]}`, fontWeight: "700" }}
              >
                Total samples tested
              </Typography>
            </div>
            <div>
              <Typography
                variant='subtitle1'
                style={{ color: `${Orange[500]}` }}
              >
                {numeral(TotalSamplesTested).format("0a")}
              </Typography>
            </div>
          </Paper>
        )}
      </div>
      <div className={styles.paperContainer}>
        {PositivityRate && (
          <Paper elevation={15} className={styles.paper}>
            <div>
              <Typography
                variant='subtitle1'
                style={{ color: `${Red[600]}`, fontWeight: "700" }}
              >
                Positivity rate
              </Typography>
            </div>
            <div>
              <Typography variant='subtitle1' style={{ color: `${Red[600]}` }}>
                {PositivityRate}
              </Typography>
            </div>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default PaperBar;
