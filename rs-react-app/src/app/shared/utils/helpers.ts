import {
  EpisodeDetails,
  SeasonType,
  SeriesDetails,
} from '../../models/types/apiTypes';

export const stringTransform = (value: string) => {
  const arr = value
    .split(/(?!^)(?=[A-Z])/)
    .map((item) => `${item.toLowerCase()} `);
  const str = arr.join(' ').trim();
  return str;
};

export const convertToCSV = (objArray: (SeriesDetails | null)[]) => {
  console.log(objArray);
  let csvString = '';
  if (objArray.length && objArray.every((item) => item !== null)) {
    const str = [
      Object.keys(objArray[0]),
      ...objArray.map((item) => Object.values(item)),
    ]
      .map((row) => row.join(','))
      .join('\n');
    csvString = str;
  }
  const csvData = new Blob([csvString], { type: 'text/csv' });
  const csvURL = URL.createObjectURL(csvData);
  return csvURL;
};

export const getDetails = (data: SeasonType) => {
  const episodes = data.season.episodes.reduce<EpisodeDetails[]>(
    (details, item) => {
      details.push({
        uid: item.uid,
        title: item.title,
        episodeNumber: item.episodeNumber,
        productionSerialNumber: item.productionSerialNumber,
        usAirDate: item.usAirDate,
      });
      return details;
    },
    []
  );
  const {
    title,
    abbreviation,
    productionStartYear,
    originalRunStartDate,
    seasonsCount,
    episodesCount,
    featureLengthEpisodesCount,
    productionCompany: { name: productionCompanyName },
    originalBroadcaster: { name: originalBroadcasterName },
  } = data.season.series;
  const series: SeriesDetails = {
    title,
    abbreviation,
    productionStartYear,
    originalRunStartDate,
    seasonsCount,
    episodesCount,
    featureLengthEpisodesCount,
    productionCompanyName,
    originalBroadcasterName,
  };
  return {
    uid: data.season.uid,
    title: data.season.title,
    seasonNumber: data.season.seasonNumber,
    series: series,
    numberOfEpisodes: data.season.numberOfEpisodes,
    episodes: episodes,
  };
};
