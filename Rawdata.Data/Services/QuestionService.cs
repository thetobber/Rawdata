﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Rawdata.Data.Models;
using Rawdata.Data.Services.Interfaces;

namespace Rawdata.Data.Services
{
    public class QuestionService : BaseService, IQuestionService
    {
        public QuestionService(DataContext context) : base(context)
        {
        }

        public async Task<Question> GetQuestionById(int id)
        {
            return await Context.Questions
                .Where(q => q.Id == id)
                .Include(q => q.Answers)
                    .ThenInclude(a => a.Author)
                .Include(q => q.Answers)
                    .ThenInclude(a => a.Comments)
                .Include(q => q.Comments)
                    .ThenInclude(c => c.Author)
                .Include(q => q.Author)
                .Include(q => q.PostTags)
                .FirstOrDefaultAsync();
        }

        public IQueryable<Question> GetNewestQuestions(int page, int size)
        {
            return Context.Questions
                .OrderByDescending(q => q.Score)
                .ThenByDescending(q => q.CreationDate)
                .Skip(size * (page - 1))
                .Take(size)
                .Include(q => q.Author);
        }
    }
}
