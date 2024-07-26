using System;
using System.Collections.Generic;

namespace UserManagement.Domain.Models;

public partial class SAddress
{
    public int AddressId { get; set; }

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string Country { get; set; } = null!;

    public string ZipCode { get; set; } = null!;

    public int UserId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public int? DeletedBy { get; set; }

    public DateTime? DeletedDate { get; set; }

    public virtual SUser User { get; set; } = null!;
}
