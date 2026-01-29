const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const promises = urls.map((url) => httpGet(url));
  const responseData = await Promise.allSettled(promises);

  const results = responseData.map((response) => {
    const responseBody = JSON.parse(response.value.body);
    if (response.value.status === 200) {
      return {['Arnie Quote'] : responseBody.message};
    } else {
      return {['FAILURE'] : responseBody.message};
    }
  });

  return results;
};

module.exports = {
  getArnieQuotes,
};
