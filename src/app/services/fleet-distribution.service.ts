import { Injectable } from '@angular/core';
import { Ship, BoardPoint } from '../constants/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FleetDistributionService {
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  possibleOrientations = ['top', 'right', 'bottom', 'left'];
  forbiddenPoints: BoardPoint[] = [];
  pointsToCheck = [];

  constructor() { }

  private isEqual = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second);
  }

  private getFirstPoint(): BoardPoint {
    let random = Math.random();
    let firstRow;
    for (let i = 0; i < this.rows.length; i++) {
      if (random < this.columns[i] / 10) {
        firstRow = this.rows[i];
        break;
      }
    }

    random = Math.random();
    let firstColumn;
    // tslint:disable-next-line
    for (let i = 0; i < this.columns.length; i++) {
      if (random < this.columns[i] / 10) {
        firstColumn = this.columns[i];
        break;
      }
    }

    const firstPoint = {x: firstRow, y: firstColumn};
    console.log(firstPoint);
    return firstPoint;
  }

  private pushPointsToCheck(
    keepConstant: string,
    shipFirstPoint: BoardPoint,
    indexGap: number,
    orientation: string,
    direction: number
    ): void {
      let targetIndex: number;
      switch (keepConstant) {
        case 'x':
          targetIndex = this.columns.indexOf(shipFirstPoint.y) + (direction * indexGap);
          this.pointsToCheck.push([
            {
              x: shipFirstPoint.x,
              y: this.columns[targetIndex]
            },
            orientation
          ]);
          break;
        case 'y':
          targetIndex = this.rows.indexOf(shipFirstPoint.x) + (direction * indexGap);
          this.pointsToCheck.push([
            {
              x: this.rows[targetIndex],
              y: shipFirstPoint.y
            },
            orientation
          ]);
          break;
      }
  }

  private getOrientation(isSafe: boolean, shipFirstPoint: BoardPoint, ship: Ship): string {
    let random;
    let orientation;
    let potentialOrientations;
    const restrictedOrientations = [];
    const lastGap = ship.length - 1;
    const oneToLastGap = ship.length - 2;

    if (isSafe) {
      console.log('isSafe: ' + isSafe);
      random = Math.random();
      if (0 <= random && random < 0.25) {
        orientation = this.possibleOrientations[0];
      } else if (0.25 <= random && random < 0.5) {
        orientation = this.possibleOrientations[1];
      } else if (0.5 <= random && random < 0.75) {
        orientation = this.possibleOrientations[2];
      } else if (0.75 <= random && random < 1) {
        orientation = this.possibleOrientations[3];
      }
    } else {
      console.log('isSafe: ' + isSafe);
      switch (ship.length) {
        case 4:
        case 2:
          // Ojo
          this.pointsToCheck = [];
          this.pushPointsToCheck('y', shipFirstPoint, lastGap, 'top', -1);
          this.pushPointsToCheck('x', shipFirstPoint, lastGap, 'right', 1);
          this.pushPointsToCheck('y', shipFirstPoint, lastGap, 'bottom', 1);
          this.pushPointsToCheck('x', shipFirstPoint, lastGap, 'left', -1);
          break;
        case 3:
          // Ojo
          this.pointsToCheck = [];
          this.pushPointsToCheck('y', shipFirstPoint, lastGap, 'top', -1);
          this.pushPointsToCheck('y', shipFirstPoint, oneToLastGap, 'top', -1);

          this.pushPointsToCheck('x', shipFirstPoint, lastGap, 'right', 1);
          this.pushPointsToCheck('x', shipFirstPoint, oneToLastGap, 'right', 1);

          this.pushPointsToCheck('y', shipFirstPoint, lastGap, 'bottom', 1);
          this.pushPointsToCheck('y', shipFirstPoint, oneToLastGap, 'bottom', 1);

          this.pushPointsToCheck('x', shipFirstPoint, lastGap, 'left', -1);
          this.pushPointsToCheck('x', shipFirstPoint, oneToLastGap, 'left', -1);
          break;
        case 1:
          break;
      }

      if (this.pointsToCheck.length !== 0) {
        console.log(this.pointsToCheck);
        this.pointsToCheck.forEach(point => {
          if ((!this.rows.includes(point[0].x) ||
              !this.columns.includes(point[0].y) ||
              this.forbiddenPoints.some(fPoint => this.isEqual(fPoint, point[0]))) &&
              !restrictedOrientations.includes(point[1])) {
            restrictedOrientations.push(point[1]);
            console.log(restrictedOrientations);
          } else {
            console.log('no entró');
          }
        });

        switch (restrictedOrientations.length) {
          case 4:
            this.getShipPosition(ship);
            break;
          case 3:
            [orientation] = this.possibleOrientations.filter(orient => !restrictedOrientations.includes(orient));
            break;
          case 2:
            potentialOrientations = this.possibleOrientations.filter(orient => !restrictedOrientations.includes(orient));
            random = Math.random();
            if (0 <= random && random < 0.5) {
              orientation = potentialOrientations[0];
            } else if (0.5 <= random && random < 1) {
              orientation = potentialOrientations[1];
            }
            break;
          case 1:
            potentialOrientations = this.possibleOrientations.filter(orient => !restrictedOrientations.includes(orient));
            random = Math.random();
            if (0 <= random && random < 1 / 3) {
              orientation = potentialOrientations[0];
            } else if (1 / 3 <= random && random < 2 / 3) {
              orientation = potentialOrientations[1];
            } else if (2 / 3 <= random && random < 1) {
              orientation = potentialOrientations[2];
            }
            break;
          case 0:
            random = Math.random();
            if (0 <= random && random < 0.25) {
              orientation = this.possibleOrientations[0];
            } else if (0.25 <= random && random < 0.5) {
              orientation = this.possibleOrientations[1];
            } else if (0.5 <= random && random < 0.75) {
              orientation = this.possibleOrientations[2];
            } else if (0.75 <= random && random < 1) {
              orientation = this.possibleOrientations[3];
            }
            break;
        }
      }
    }
    console.log(orientation);
    return orientation;
  }

  private getPosition(shipFirstPoint: BoardPoint, shipLength: number, shipOrientation: string): BoardPoint[] {
    const shipPosition: BoardPoint[] = [];
    switch (shipOrientation) {
      case 'top':
        for (let i = 0; i < shipLength; i++) {
          shipPosition.push({
            x: this.rows[this.rows.indexOf(shipFirstPoint.x) - i],
            y: shipFirstPoint.y
          });
        }
        break;
      case 'right':
        for (let i = 0; i < shipLength; i++) {
          shipPosition.push({
            x: shipFirstPoint.x,
            y: this.columns[this.columns.indexOf(shipFirstPoint.y) + i]
          });
        }
        break;
      case 'bottom':
        for (let i = 0; i < shipLength; i++) {
          shipPosition.push({
            x: this.rows[this.rows.indexOf(shipFirstPoint.x) + i],
            y: shipFirstPoint.y
          });
        }
        break;
      case 'left':
        for (let i = 0; i < shipLength; i++) {
          shipPosition.push({
            x: shipFirstPoint.x,
            y: this.columns[this.columns.indexOf(shipFirstPoint.y) - i]
          });
        }
        break;
    }

    return shipPosition;
  }

  public getShipPosition(shipType: Ship): BoardPoint[] {
    let isSafe;
    let shipOrientation;
    let shipPosition: BoardPoint[];
    let firstPoint: BoardPoint = this.getFirstPoint();
    while (this.forbiddenPoints.length !== 0 && this.forbiddenPoints.some(fPoint => this.isEqual(fPoint, firstPoint))) {
      console.log(this.forbiddenPoints);
      firstPoint = this.getFirstPoint();
    }
    const ship = shipType;
    const carrierSafeRows = ['D', 'E', 'F', 'G'];
    const carrierSafeCols = [4, 5, 6, 7];
    if (ship.length === 1) {
      shipPosition = [firstPoint];
    } else if (ship.length === 4 &&
               carrierSafeRows.includes(firstPoint.x) &&
               carrierSafeCols.includes(firstPoint.y)) {
      isSafe = true;
      shipOrientation = this.getOrientation(isSafe, firstPoint, ship);
      shipPosition = this.getPosition(firstPoint, ship.length, shipOrientation);
    } else {
      isSafe = false;
      shipOrientation = this.getOrientation(isSafe, firstPoint, ship);
      shipPosition = this.getPosition(firstPoint, ship.length, shipOrientation);
    }
    shipPosition.forEach(position => this.forbiddenPoints.push(position));
    console.log(this.forbiddenPoints);
    return shipPosition;
  }

  public resetForbiddenPoints(): void {
    console.log(this.forbiddenPoints);
    this.forbiddenPoints = [];
    console.log(this.forbiddenPoints);
  }


}
