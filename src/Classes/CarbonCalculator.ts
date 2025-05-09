import { TransportConfig } from "../Config/TransportConfig";
import type { TransportType } from "../Config/TransportConfig";

export class CarbonCalculator {

    // attribut to get an intence of classe
  private transportConfig: TransportConfig;


// constructor 
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



  /**
   * Validate Input depends of environnement variables handle by TransportConfig classe
   * @param transportType 
   * @param distance 
   * @param weight 
   */
  validateInputs(transportType: TransportType, distance: number, weight: number): void {

    // Check NaN variable for distance and weight
    if (typeof distance !== 'number' || isNaN(distance) || distance <= 0) throw new Error("Distance must be a zero or up to zero.")
    if (typeof weight !== 'number' || isNaN(weight) || weight < 0) throw new Error("Weight must be a up to zero.");

    // check the max value
    const maxAllowedWeight = this.transportConfig.getMaxWeight(transportType);
    if (weight > maxAllowedWeight) throw new Error(`Weight is not allowed for ${transportType}: ${maxAllowedWeight}`);
  }


/**
 * Calculate emmision if datas are validated 
 * @param transportType 
 * @param distance 
 * @param weight 
 * @returns 
 */
  calculateEmission(transportType: TransportType, distance: number, weight: number): number {
    this.validateInputs(transportType, distance, weight);
    const emissionFactor = this.transportConfig.getEmissionFactor(transportType);
    return distance * emissionFactor * (1 + weight / 100);
  }
  
}
