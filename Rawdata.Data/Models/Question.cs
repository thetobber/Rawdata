﻿using System;
using System.Collections.Generic;
using Rawdata.Data.Models.Relationships;

namespace Rawdata.Data.Models
{
    public class Question : Post
    {
        public string Title { get; set; }

        public int? AcceptedAnswerId { get; set; }
        
        public Answer AcceptedAnswer { get; set; }

        public DateTime? ClosedDate { get; set; }

        public ICollection<Answer> Answers { get; set; }

        public ICollection<PostTag> PostTags { get; set; }
    }
}
