import {
  LegalPageLayout,
  LegalSection,
  LegalList,
  LegalLink,
} from '@/shared/components';

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="9 tháng 12, 2024">
      <LegalSection title="1. Chấp nhận điều khoản">
        <p>
          Bằng việc truy cập và sử dụng Cogie (&quot;Dịch vụ&quot;), bạn đồng ý
          tuân theo các Điều khoản Dịch vụ này (&quot;Điều khoản&quot;). Nếu bạn
          không đồng ý với các Điều khoản này, vui lòng không sử dụng Dịch vụ.
          Chúng tôi có quyền sửa đổi các Điều khoản này bất cứ lúc nào, và việc
          bạn tiếp tục sử dụng Dịch vụ đồng nghĩa với việc chấp nhận mọi sửa
          đổi.
        </p>
      </LegalSection>

      <LegalSection title="2. Mô tả dịch vụ">
        <p>
          Cogie cung cấp nền tảng kết nối người dùng với các đối tác đồng hành
          cho các cuộc trò chuyện và hoạt động. Dịch vụ có thể bao gồm các tính
          năng, công cụ và chức năng khác nhau có thể được cập nhật, sửa đổi
          hoặc ngừng cung cấp theo quyết định của chúng tôi.
        </p>
      </LegalSection>

      <LegalSection title="3. Tài khoản người dùng">
        <p className="mb-4">
          Để truy cập một số tính năng của Dịch vụ, bạn có thể cần tạo tài
          khoản. Bạn đồng ý:
        </p>
        <LegalList
          items={[
            'Cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký',
            'Duy trì và cập nhật thông tin tài khoản kịp thời',
            'Bảo mật mật khẩu của bạn',
            'Chịu trách nhiệm về mọi hoạt động xảy ra dưới tài khoản của bạn',
            'Thông báo cho chúng tôi ngay lập tức về bất kỳ việc sử dụng trái phép tài khoản của bạn',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Sử dụng chấp nhận được">
        <p className="mb-4">Bạn đồng ý không sử dụng Dịch vụ để:</p>
        <LegalList
          items={[
            'Vi phạm bất kỳ luật pháp hoặc quy định nào',
            'Xâm phạm quyền của người khác',
            'Truyền tải nội dung có hại, xúc phạm hoặc không phù hợp',
            'Cố gắng truy cập trái phép vào Dịch vụ hoặc hệ thống của nó',
            'Can thiệp hoặc làm gián đoạn Dịch vụ hoặc máy chủ',
            'Sử dụng Dịch vụ cho bất kỳ mục đích bất hợp pháp hoặc trái phép nào',
            'Thu thập hoặc lấy dữ liệu người dùng mà không có sự đồng ý',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Sở hữu trí tuệ">
        <p>
          Dịch vụ và nội dung gốc, tính năng và chức năng của nó thuộc sở hữu
          của Cogie và được bảo vệ bởi luật bản quyền, thương hiệu, bằng sáng
          chế, bí mật thương mại quốc tế và các luật sở hữu trí tuệ khác. Bạn
          không được sao chép, sửa đổi, phân phối, bán hoặc cho thuê bất kỳ phần
          nào của Dịch vụ mà không có sự đồng ý bằng văn bản trước của chúng
          tôi.
        </p>
      </LegalSection>

      <LegalSection title="6. Nội dung người dùng">
        <p>
          Bạn giữ quyền sở hữu bất kỳ nội dung nào bạn gửi đến Dịch vụ. Bằng
          việc gửi nội dung, bạn cấp cho chúng tôi giấy phép toàn cầu, không độc
          quyền, miễn phí bản quyền để sử dụng, sao chép, sửa đổi và hiển thị
          nội dung đó liên quan đến việc cung cấp Dịch vụ. Bạn hoàn toàn chịu
          trách nhiệm về nội dung bạn gửi và phải đảm bảo nó không vi phạm bất
          kỳ quyền của bên thứ ba nào.
        </p>
      </LegalSection>

      <LegalSection title="7. Miễn trừ bảo hành">
        <p>
          DỊCH VỤ ĐƯỢC CUNG CẤP &quot;NGUYÊN TRẠNG&quot; VÀ &quot;NHƯ CÓ
          SẴN&quot; MÀ KHÔNG CÓ BẤT KỲ BẢO ĐẢM NÀO, DÙ LÀ RÕ RÀNG HAY NGỤ Ý.
          CHÚNG TÔI KHÔNG BẢO ĐẢM RẰNG DỊCH VỤ SẼ KHÔNG BỊ GIÁN ĐOẠN, AN TOÀN
          HOẶC KHÔNG CÓ LỖI. VIỆC BẠN SỬ DỤNG DỊCH VỤ LÀ RỦI RO CỦA RIÊNG BẠN.
        </p>
      </LegalSection>

      <LegalSection title="8. Giới hạn trách nhiệm">
        <p>
          TRONG PHẠM VI TỐI ĐA ĐƯỢC PHÁP LUẬT CHO PHÉP, COGIE SẼ KHÔNG CHỊU
          TRÁCH NHIỆM VỀ BẤT KỲ THIỆT HẠI GIÁN TIẾP, NGẪU NHIÊN, ĐẶC BIỆT, HỆ
          QUẢ HOẶC MANG TÍNH TRỪNG PHẠT NÀO, HOẶC BẤT KỲ MẤT MÁT LỢI NHUẬN HOẶC
          DOANH THU NÀO, DÙ PHÁT SINH TRỰC TIẾP HAY GIÁN TIẾP, HOẶC BẤT KỲ MẤT
          MÁT DỮ LIỆU, SỬ DỤNG, UY TÍN HOẶC CÁC THIỆT HẠI VÔ HÌNH KHÁC.
        </p>
      </LegalSection>

      <LegalSection title="9. Chấm dứt">
        <p>
          Chúng tôi có thể chấm dứt hoặc đình chỉ tài khoản và quyền truy cập
          Dịch vụ của bạn ngay lập tức, không cần thông báo trước hoặc chịu
          trách nhiệm, vì bất kỳ lý do gì, bao gồm nếu bạn vi phạm các Điều
          khoản này. Khi chấm dứt, quyền sử dụng Dịch vụ của bạn sẽ ngay lập tức
          hết hiệu lực.
        </p>
      </LegalSection>

      <LegalSection title="10. Luật điều chỉnh">
        <p>
          Các Điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp của
          quốc gia nơi Cogie hoạt động, không tính đến các quy định về xung đột
          pháp luật.
        </p>
      </LegalSection>

      <LegalSection title="11. Liên hệ">
        <p>
          Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng liên hệ
          với chúng tôi tại{' '}
          <LegalLink href="mailto:legal@cogie.com">legal@cogie.com</LegalLink>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
