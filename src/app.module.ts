import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstructorModule } from './instructor/instructor.module';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SectionModule } from './section/section.module';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
import { connectionOptions } from './ormconfig';
import { validate } from './env.validation';
import { ProductModule } from './product/product.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    InstructorModule,
    CourseModule,
    SectionModule,
    LessonModule,
    StudentModule,
    ProductModule,
    SubscriptionModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
