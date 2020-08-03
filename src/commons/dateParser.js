import * as moment from "moment/min/moment-with-locales";

export default (date) => {
    let momentDate = moment(date);
    momentDate.locale("es");
    return momentDate.format("D [de] MMMM [de] YYYY");
  };