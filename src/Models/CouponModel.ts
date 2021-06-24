class CouponModel {
  public id: number;
  public companyId: number;
  public title: string;
  public category: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public amount: number;
  public price: number;
  public image: string;
  public imageFile: FileList;
}
export default CouponModel;
