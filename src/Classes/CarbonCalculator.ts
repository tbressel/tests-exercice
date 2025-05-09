import { TransportConfig } from "../Config/TransportConfig";
import type { TransportType } from "../Config/TransportConfig";

export class CarbonCalculator {

    // attribut to get an intence of classe
  private transportConfig: TransportConfig;



  constructor() {
    this.transportConfig = new TransportConfig();
  }


/**
 * get emmission factor from environnement class
 * @param transportType to choose type of transport
 * @returns 
 */
  getEmissionFactor(transportType: TransportType): number {
    return this.transportConfig.getEmissionFactor(transportType);
  }
}
