import * as superagent from 'superagent';

export class FeaturesService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || '/features';
  }

  async listFeatures() {
    return superagent
        .get(this.baseUrl)
        .set('accept', 'application/json')
        .then(res => {
          console.log('Got response: ', res);
          return res.body || {};
        });
  }
}
