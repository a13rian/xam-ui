import {
  LegalPageLayout,
  LegalSection,
  LegalSubsection,
  LegalList,
  LegalLink,
} from '@/shared/components';

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="9 tháng 12, 2024">
      <LegalSection title="1. Giới thiệu">
        <p>
          Chào mừng bạn đến với Cogie (&quot;chúng tôi&quot;). Chúng tôi cam kết
          bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách Bảo mật
          này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ
          thông tin của bạn khi bạn sử dụng Dịch vụ của chúng tôi.
        </p>
      </LegalSection>

      <LegalSection title="2. Thông tin chúng tôi thu thập">
        <LegalSubsection title="2.1 Thông tin bạn cung cấp">
          <LegalList
            items={[
              'Thông tin tài khoản (tên, địa chỉ email, mật khẩu)',
              'Thông tin hồ sơ bạn chọn cung cấp',
              'Các liên lạc bạn gửi cho chúng tôi',
              'Nội dung bạn tạo, tải lên hoặc chia sẻ qua Dịch vụ',
              'Thông tin thanh toán (được xử lý an toàn bởi các nhà cung cấp bên thứ ba)',
            ]}
          />
        </LegalSubsection>

        <LegalSubsection title="2.2 Thông tin thu thập tự động">
          <LegalList
            items={[
              'Thông tin thiết bị (loại trình duyệt, hệ điều hành, mã định danh thiết bị)',
              'Dữ liệu nhật ký (địa chỉ IP, thời gian truy cập, trang đã xem)',
              'Thông tin sử dụng (các tính năng đã sử dụng, tương tác với Dịch vụ)',
              'Cookie và công nghệ theo dõi tương tự',
            ]}
          />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. Cách chúng tôi sử dụng thông tin">
        <p className="mb-4">
          Chúng tôi sử dụng thông tin thu thập được để:
        </p>
        <LegalList
          items={[
            'Cung cấp, duy trì và cải thiện Dịch vụ của chúng tôi',
            'Xử lý giao dịch và gửi thông tin liên quan',
            'Gửi cho bạn thông báo kỹ thuật, cập nhật và tin nhắn hỗ trợ',
            'Phản hồi nhận xét, câu hỏi và yêu cầu của bạn',
            'Liên lạc với bạn về sản phẩm, dịch vụ và sự kiện',
            'Theo dõi và phân tích xu hướng, mức sử dụng và hoạt động',
            'Phát hiện, điều tra và ngăn chặn các hoạt động gian lận hoặc trái phép',
            'Cá nhân hóa và cải thiện trải nghiệm của bạn',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Chia sẻ thông tin">
        <p className="mb-4">
          Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau:
        </p>
        <LegalList
          items={[
            <span key="providers">
              <strong>Nhà cung cấp dịch vụ:</strong> Với các nhà cung cấp bên
              thứ ba thực hiện dịch vụ thay mặt chúng tôi
            </span>,
            <span key="legal">
              <strong>Yêu cầu pháp lý:</strong> Khi được yêu cầu theo luật hoặc
              để phản hồi quy trình pháp lý
            </span>,
            <span key="rights">
              <strong>Bảo vệ quyền lợi:</strong> Để bảo vệ quyền lợi, tài sản và
              sự an toàn của Cogie, người dùng hoặc những người khác
            </span>,
            <span key="business">
              <strong>Chuyển nhượng kinh doanh:</strong> Liên quan đến sáp nhập,
              mua lại hoặc bán tài sản
            </span>,
            <span key="consent">
              <strong>Với sự đồng ý của bạn:</strong> Khi bạn đã cho phép chúng
              tôi chia sẻ thông tin của bạn
            </span>,
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Bảo mật dữ liệu">
        <p>
          Chúng tôi thực hiện các biện pháp kỹ thuật và tổ chức phù hợp để bảo
          vệ thông tin cá nhân của bạn khỏi truy cập, thay đổi, tiết lộ hoặc phá
          hủy trái phép. Tuy nhiên, không có phương thức truyền tải qua Internet
          hoặc lưu trữ điện tử nào hoàn toàn an toàn, và chúng tôi không thể đảm
          bảo an ninh tuyệt đối.
        </p>
      </LegalSection>

      <LegalSection title="6. Lưu giữ dữ liệu">
        <p>
          Chúng tôi lưu giữ thông tin cá nhân của bạn trong thời gian cần thiết
          để thực hiện các mục đích mà thông tin được thu thập, bao gồm để đáp
          ứng các yêu cầu pháp lý, kế toán hoặc báo cáo. Khi chúng tôi không còn
          cần thông tin của bạn, chúng tôi sẽ xóa hoặc ẩn danh hóa một cách an
          toàn.
        </p>
      </LegalSection>

      <LegalSection title="7. Quyền và lựa chọn của bạn">
        <p className="mb-4">
          Tùy thuộc vào vị trí của bạn, bạn có thể có một số quyền nhất định
          liên quan đến thông tin cá nhân của mình:
        </p>
        <LegalList
          items={[
            <span key="access">
              <strong>Truy cập:</strong> Yêu cầu truy cập thông tin cá nhân của
              bạn
            </span>,
            <span key="correction">
              <strong>Chỉnh sửa:</strong> Yêu cầu chỉnh sửa thông tin không
              chính xác
            </span>,
            <span key="deletion">
              <strong>Xóa:</strong> Yêu cầu xóa thông tin cá nhân của bạn
            </span>,
            <span key="portability">
              <strong>Di chuyển:</strong> Yêu cầu bản sao dữ liệu ở định dạng có
              thể di chuyển
            </span>,
            <span key="optout">
              <strong>Từ chối:</strong> Từ chối nhận thông tin tiếp thị
            </span>,
            <span key="withdraw">
              <strong>Rút lại đồng ý:</strong> Rút lại sự đồng ý khi việc xử lý
              dựa trên sự đồng ý
            </span>,
          ]}
        />
      </LegalSection>

      <LegalSection title="8. Cookie và công nghệ theo dõi">
        <p className="mb-4">
          Chúng tôi sử dụng cookie và công nghệ theo dõi tương tự để thu thập và
          theo dõi thông tin về việc sử dụng Dịch vụ của bạn. Bạn có thể kiểm
          soát cookie thông qua cài đặt trình duyệt. Các loại cookie chúng tôi
          sử dụng:
        </p>
        <LegalList
          items={[
            <span key="essential">
              <strong>Cookie thiết yếu:</strong> Cần thiết để Dịch vụ hoạt động
              đúng cách
            </span>,
            <span key="analytics">
              <strong>Cookie phân tích:</strong> Giúp chúng tôi hiểu cách khách
              truy cập tương tác với Dịch vụ
            </span>,
            <span key="preference">
              <strong>Cookie tùy chọn:</strong> Ghi nhớ cài đặt và tùy chọn của
              bạn
            </span>,
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Liên kết bên thứ ba">
        <p>
          Dịch vụ của chúng tôi có thể chứa liên kết đến các trang web hoặc dịch
          vụ của bên thứ ba. Chúng tôi không chịu trách nhiệm về các hoạt động
          bảo mật của các bên thứ ba này. Chúng tôi khuyến khích bạn đọc chính
          sách bảo mật của bất kỳ trang web bên thứ ba nào bạn truy cập.
        </p>
      </LegalSection>

      <LegalSection title="10. Quyền riêng tư của trẻ em">
        <p>
          Dịch vụ của chúng tôi không dành cho trẻ em dưới 13 tuổi. Chúng tôi
          không cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu bạn
          là phụ huynh hoặc người giám hộ và tin rằng con bạn đã cung cấp thông
          tin cá nhân cho chúng tôi, vui lòng liên hệ với chúng tôi.
        </p>
      </LegalSection>

      <LegalSection title="11. Chuyển giao dữ liệu quốc tế">
        <p>
          Thông tin của bạn có thể được chuyển đến và xử lý tại các quốc gia
          khác với quốc gia cư trú của bạn. Các quốc gia này có thể có luật bảo
          vệ dữ liệu khác với luật của quốc gia bạn. Chúng tôi thực hiện các
          biện pháp bảo vệ phù hợp để đảm bảo thông tin của bạn được bảo vệ.
        </p>
      </LegalSection>

      <LegalSection title="12. Thay đổi chính sách">
        <p>
          Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Chúng
          tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính
          sách Bảo mật mới trên trang này và cập nhật ngày &quot;Cập nhật lần
          cuối&quot;. Chúng tôi khuyến khích bạn xem lại Chính sách Bảo mật này
          định kỳ.
        </p>
      </LegalSection>

      <LegalSection title="13. Liên hệ">
        <p>
          Nếu bạn có bất kỳ câu hỏi nào về Chính sách Bảo mật này hoặc các hoạt
          động bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi tại{' '}
          <LegalLink href="mailto:privacy@cogie.com">
            privacy@cogie.com
          </LegalLink>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
