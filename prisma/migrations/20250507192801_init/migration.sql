-- CreateTable
CREATE TABLE "Attendee" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_email_key" ON "Attendee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_phoneNumber_key" ON "Attendee"("phoneNumber");
