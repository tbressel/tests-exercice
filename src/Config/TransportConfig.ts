import dotenv from 'dotenv';
dotenv.config();

// define type 
export type TransportType = typeof TRANSPORT_TYPES[number];

const TRANSPORT_TYPES = [
  'BIKE',
  'ELECTRIC_CAR',
  'SCOOTER',
  'GAS_CAR',
  'DIESEL_VAN',
  'TRUCK'
] as const;




export class TransportConfig {
  
  
  /**
   * Methode to get value from .env config file
   * @param key 
   * @returns 
   */
  private getTransportConstValue(key: string): number {

    // Catch the value from env file
    const value = process.env[key];
    if (!value) throw new Error(`Environment variable couldn't be got: ${key}`);
    
    // Check if the Number value is not a NaN !
    const parsed = Number(value);
    if (isNaN(parsed)) throw new Error(`It must be a number: ${key}`);
    return parsed;
  }


  /**
   * Get value of emmission 
   * @param type kind of vehicle
   * @returns 
   */
  public getEmissionFactor(type: TransportType): number {
    return this.getTransportConstValue(`EMISSION_${type}`);
  }


  /**
   * Get value of average speed
   * @param type of a kind of transport
   * @returns 
   */
  public getAverageSpeed(type: TransportType): number {
    return this.getTransportConstValue(`SPEED_${type}`);
  }


  /**
   * Get max weight for a type of transport
   * @param type 
   * @returns 
   */
  public getMaxWeight(type: TransportType): number {
    return this.getTransportConstValue(`MAX_WEIGHT_${type}`);
  }



  public getTransportType(): TransportType[] {
    return [...TRANSPORT_TYPES];
  }

}
