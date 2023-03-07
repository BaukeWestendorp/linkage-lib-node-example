import {
  GamepadManager,
  Robot,
  SparkMotor,
  Subsystem,
} from "@impossiblerobotics/linkage";

class DriveSubsystem extends Subsystem {
  private leftMotor = new SparkMotor(0);
  private rightMotor = new SparkMotor(1);

  x = 0;

  public tick(): void {
    const leftJoystickY = GamepadManager.shared.primaryGamepad.leftJoystickY;
    const rightJoystickY = GamepadManager.shared.primaryGamepad.rightJoystickY;

    this.leftMotor.setSpeedPercentage(leftJoystickY);
    this.rightMotor.setSpeedPercentage(rightJoystickY);

    if (this.x % 50 === 0) {
      console.log(Date.now() + "\r");
    }

    this.x++;
  }
}

class TestRobot extends Robot {
  public constructor() {
    super();

    this.registerSubsystem(new DriveSubsystem(this));
  }
}

new TestRobot().run();
