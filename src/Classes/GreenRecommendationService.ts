import { TransportConfig } from "../Config/TransportConfig";
import type { TransportType } from "../Config/TransportConfig";

export class GreenRecommendationService {

  // attribut to get an instance of TransportConfig
  private transportConfig: TransportConfig;

  // constructor
  constructor() {
    this.transportConfig = new TransportConfig();
  }

  /**
   * Calculate estimated delivery time
   * @param distance km
   * @param transportType type of transport
   * @returns estimated time 
   */
  calculateTimeEstimation(distance: number, transportType: TransportType): number {
    // Check validity of distance
    if (typeof distance !== 'number' || isNaN(distance) || distance <= 0) throw new Error("Distance must be greater than zero.");

    // get and validate speed
    const averageSpeed = this.transportConfig.getAverageSpeed(transportType);
    // console.log('vitesse moyenne : ', averageSpeed);
    if (averageSpeed <= 0) throw new Error(`Average speed must be up than zero for: ${transportType}`);

    // Compute and return time
    const time = distance / averageSpeed;
    // console.log('temps :', time)
    return Number(time.toFixed(2));
  }
}
