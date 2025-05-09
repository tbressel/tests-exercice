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
    public calculateTimeEstimation(distance: number, transportType: TransportType): number {
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





    /**
   * Check if the delivery can be done with a deadline
   * @param transportType 
   * @param distance 
   * @param deadline a value etimated by ourselves
   * @returns true if wa can , false if we can't
   */
    public isDeadlineFeasible(transportType: TransportType, distance: number, deadline: number): boolean {
        // Validate datas
        if (typeof distance !== 'number' || isNaN(distance) || distance <= 0) throw new Error("Distance must be up than zero.");
        if (typeof deadline !== 'number' || isNaN(deadline) || deadline <= 0) throw new Error("Deadline must be up than zero.");

        // Get and compare estimated time for transport
        // console.log (this.calculateTimeEstimation(distance, transportType) <= deadline);
        return this.calculateTimeEstimation(distance, transportType) <= deadline;
    }





    /**
    * Suggest the most eco transport
    * @param distance
    * @param weight
    * @param deadline
    * @return TransportType
    */
    public getSuggestedTransport(distance: number, weight: number, deadline: number): TransportType {
        const allTransportTypes = this.transportConfig.getTransportType();

        // filter and check transport depending choosen params
        const choosenTransports = allTransportTypes.filter(type => {
            const maxWeight = this.transportConfig.getMaxWeight(type);
            // console.log(' max weight for this type :', maxWeight);
            return weight <= maxWeight && this.isDeadlineFeasible(type, distance, deadline);
        });
        if (choosenTransports.length === 0) throw new Error("No transport found for these given parameters.");


        // The lowest CO2 transport
        let ecoTransport = choosenTransports[0];
        let lowestCo2: number = distance * this.transportConfig.getEmissionFactor(ecoTransport) * (1 + weight / 100);


        // reduce the list to find the lowest CO2
        ecoTransport = choosenTransports.reduce((best, type) => {
            // console.log('iteration loop on : ',best + ' type ' + type)
            const co2 = distance * this.transportConfig.getEmissionFactor(type) * (1 + weight / 100);
            if (co2 < lowestCo2) {
                lowestCo2 = co2;
                return type;
            }
            return best;
        }, ecoTransport);

        return ecoTransport;
    }





}
