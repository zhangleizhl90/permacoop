import { LeaveRequest, Type } from './LeaveRequest.entity';

export class UserLeavesCollection {
  public paid: LeaveRequest[] = [];
  public unpaid: LeaveRequest[] = [];
  public special: LeaveRequest[] = [];
  public medical: LeaveRequest[] = [];

  constructor(leaves: LeaveRequest[]) {
    this.distributeLeavesByType(leaves);
  }

  private distributeLeavesByType(leaves: LeaveRequest[]): void {
    for (const leave of leaves) {
      switch (leave.getType()) {
        case Type.PAID:
          this.paid.push(leave);
          break;
        case Type.UNPAID:
          this.unpaid.push(leave);
          break;
        case Type.SPECIAL:
          this.special.push(leave);
          break;
        case Type.MEDICAL:
          this.medical.push(leave);
      }
    }
  }
}
