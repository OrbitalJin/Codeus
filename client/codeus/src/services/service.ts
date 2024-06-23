// This represent a generic Serivce
export default class Service {
  protected static instance: Service;

  protected constructor() {
    // Protected constructor to prevent external instantiation
    if (Service.instance) {
      throw new Error("Use Service.getInstance() instead of new Service()");
    }
  }

  public static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }
}
