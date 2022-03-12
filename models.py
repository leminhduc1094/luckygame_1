from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    is_active = Column(Boolean, default=True)
    score = Column(Integer, default=0)
    played_at = Column(DateTime, nullable=True)





# spin_number = 0
# function check_spin() {
#         if (spin_number == 0){
#             spin();
#             spin_number += 1;
#         }
#         else {
#             swal(
#               "Rất tiếc",
#               "Bạn đã hết lượt quay hôm nay.",
#               "error"
#             );
#         }
# }

