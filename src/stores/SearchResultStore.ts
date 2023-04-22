import axios from 'axios';
import { defineStore } from 'pinia';

import type { VehicleRaw } from '@/types/Vehicle';

// Dummy API response to circumvent local/prod cross origin violation.
// import response from '@/data/search-results-data.json';

type State = {
  vehicles: VehicleRaw[];
};

export const useSearchResultStore = defineStore('searchResultStore', {
  actions: {
    getVehicles() {
      const adDataRaw = document.querySelector('[data-vue-selector="ad-data"]')?.innerHTML;
      const adData = adDataRaw ? JSON.parse(adDataRaw) : {};

      const params = {
        ad_id: adData.id || '',
        dealer_group_id: '',
        dealer_id: adData.dealerId || '',
        make: adData.details.Make || '',
        make_id: '',
        model: adData.details.Model || '',
      };

      const query = new URLSearchParams(params);
      const querystring = query.toString();

      axios
        .get(`/api/search-results-data/vdp-featured?${querystring}`)
        .then((response) => {
          const vehiclesRaw: VehicleRaw[] = response.data.results;

          this.setVehicles(vehiclesRaw);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setVehicles(vehicles: VehicleRaw[]) {
      this.vehicles = vehicles;
    },
  },
  state: (): State => ({
    vehicles: [],
  }),
});
